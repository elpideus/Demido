const {CommandInteraction} = require("discord.js");

module.exports = {
    name: "shuffle",
    aliases: ["rs"],
    description: "Randomizes the songs in the current playlist",
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     * @licence GPL-v.3
     */
    async execute(interaction, client) {
        const voiceChannel = interaction.member.voice.channel;
        const queue = await client.distube.getQueue(voiceChannel);
        await queue.shuffle(voiceChannel);
        await interaction.reply({content: "✔️ | The queue has been randomized.", ephemeral: true})
    }
}