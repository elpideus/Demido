const {CommandInteraction} = require("discord.js");

module.exports = {
    name: "stop",
    description: "Stops the music",
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     * @licence GPL-v.3
     */
    async execute(interaction, client) {
        const voiceChannel = interaction.member.voice.channel;
        const queue = await client.distube.getQueue(voiceChannel);
        await queue.stop(voiceChannel);
        await interaction.reply({content: "🛑 | The music has been stopped.", ephemeral: true})
    }
}