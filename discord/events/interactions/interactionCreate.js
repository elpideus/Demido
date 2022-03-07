const {Client, CommandInteraction, MessageEmbed} = require("discord.js");
module.exports = {
    name: "interactionCreate",
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     * @licence GPL-v.3
     */
    async execute(interaction, client) {
        if (interaction.isCommand() || interaction.isContextMenu()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return interaction.reply({embeds: [
                new MessageEmbed()
                    .setColor("RED")
                    .setDescription("⛔ | An error occurred while running this command.")
                ]}) && client.commands.delete(interaction.commandName);
            command.execute(interaction, client);
        }
    }
}