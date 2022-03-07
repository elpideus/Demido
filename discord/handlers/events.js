const {Events} = require("../validation/eventNames");
const {promisify} = require("util");
const {glob} = require("glob");
const Ascii = require("ascii-table");
const PG = promisify(glob);

module.exports = async (client) => {
    const Table = new Ascii("Events Loaded");
    (await PG(`${process.cwd()}/discord/events/*/*.js`)).map(async (file) => {
        const event = require(file);
        if (!Events.includes(event.name) || !event.name) {
            const L = file.split("/");
            if (L[9] === "music.js") { await Table.addRow("musicEventsHandler", "✔️ SUCCESSFUL");
            } else {
                await Table.addRow(`${event.name || "MISSING"}`, `⛔ Event name is either invalid or missing: ${L[7] + "/" + L[8]}`);
                return;
            }
        }
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
        await Table.addRow(event.name, "✔️ SUCCESSFUL");
    });
    console.log(Table.toString());
}