const {CommandInteraction} = require("discord.js");

module.exports = {
    name: "queue",
    description: "Shows the songs in the queue.",
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     * @licence GPL-3.0
     */
    async execute(interaction, client) {
        const voiceChannel = interaction.member.voice.channel;
        const queue = await client.distube.getQueue(voiceChannel);
        if (queue === undefined) {interaction.reply({content: "⛔ | There are no songs in the queue.", ephemeral: true}); return;}
        interaction.reply({content: `There are **${queue.songs.length}** songs in the queue right now with a total duration of \`${queue.formattedDuration}\`: \n\n` + queue.songs.map((song, id) => `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\` - [Link](<${song.url}>)`).slice(0, 10).join("\n"), ephemeral: true});
    }
}