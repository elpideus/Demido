const {Perms} = require("../validation/permissions"); // A list of permissions
const {Client} = require("discord.js");
const {promisify} = require("util");
const {glob} = require("glob");
const Ascii = require("ascii-table");
const PG = promisify(glob);

/**
 * This is the commands handler. It gets all the commands from the commands directory and
 * loads them as slash/app commands. It also loads context menu commands.
 *
 * @param {Client} client
 * @licence GPL-3.0
 */
module.exports = async (client) => {
    const Table = new Ascii("Discord Commands Loaded"); // create an ASCII table
    let commandsArray = [];
    (await PG(`${process.cwd()}/discord/commands/*/*.js`)).map(async (file) => {
        const command = require(file);
        if (!command.name) return Table.addRow(file.split("/")[7], "⛔ FAILED", "Missing a name");
        if (command.permission) {
            if (Perms.includes(command.permission)) command.defaultPermission = false;
            else return Table.addRow(file.split("/")[7], "⛔ FAILED", "Permission is invalid");
        }
        client.commands.set(command.name, command);
        commandsArray.push(command);
        await Table.addRow(command.name, "✔️ SUCCESSFUL");
    });
    console.log(Table.toString()); // print the table to the console

    client.on("ready", async () => {
       const mainGuild = await client.guilds.cache.get(process.env.AXE_COMMUNITY_GUILD_ID);
       mainGuild.commands.set(commandsArray).then(async (command) => {
           const roles = (commandName) => {
               const cmdPerms = commandsArray.find((c) => c.name === commandName).permission;
               if(!cmdPerms) return null;
               return mainGuild.roles.cache.filter((r) => r.permissions.has(cmdPerms));
           }
           const fullPermissions = command.reduce((accumulator, r) => {
               const newRoles = roles(r.name);
               if (!newRoles) return accumulator;
               const permissions = newRoles.reduce((a, r) => {
                   return [...a, {id: r.id, type: "ROLE", permission: true}];
               }, []);
               return [...accumulator, {id: r.id, permissions}]
           }, []);
           await mainGuild.commands.permissions.set({fullPermissions})
       });
    });
}