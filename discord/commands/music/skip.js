const {CommandInteraction} = require("discord.js");

module.exports = {
    name: "skip",
    aliases: ["next"],
    description: "Skips the currently playing song to the next song in the queue",
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     * @licence GPL-3.0
     */
    async execute(interaction, client) {
        const voiceChannel = interaction.member.voice.channel;
        const queue = await client.distube.getQueue(voiceChannel);
        if (!queue) {
            interaction.reply("I'm not playing anything right now!");
            queue.stop(voiceChannel);
            return;
        }
        await queue.skip(voiceChannel);
        await interaction.reply({content: "✔️ | Skipped to the next song.", ephemeral: true})
    }
}