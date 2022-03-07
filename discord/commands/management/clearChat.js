const {CommandInteraction} = require("discord.js");

module.exports = {
    name: "clearchat",
    aliases: ["cc", "cls"],
    description: "Deletes messages from the chat.",
    permission: "MANAGE_MESSAGES",
    options: [{
        name: "amount",
        description: "The amount (maximum 100) of messages that you want to delete.",
        type: "NUMBER",
        required: false
    }],
    /**
     * Clears the chat. Deletes the messages from the channel where the command gets used in.
     *
     * @param {CommandInteraction} interaction
     * @licence GPL-v.3
     */
    async execute(interaction) {
        interaction.reply({content: "The messages have been deleted successfully!", ephemeral: true});
        if (interaction.options.get("amount") === null) {
            while (true) {
                const messages = await interaction.channel.messages.fetch({limit: 99});
                if (messages.size === 0) break;
                await interaction.channel.bulkDelete(messages);
            }
        } else {
            const messages = await interaction.channel.messages.fetch({limit: Number(interaction.options.get("amount").value)});
            if (messages.size !== 0) {
                await interaction.channel.bulkDelete(messages);
            }
        }
    }
}