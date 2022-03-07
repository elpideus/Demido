const {CommandInteraction, MessageEmbed} = require("discord.js");

module.exports = {
    name: "play",
    description: "Play a song by its title or URL.",
    options: [{
        name: "song",
        description: "The song that you want me to play",
        type: "STRING",
        required: true
    }],
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     * @licence GPL-v.3
     */
    async execute(interaction, client) {
        const {options, member, guild, channel} = interaction;
        const voiceChannel = member.voice.channel;

        if (!voiceChannel) return interaction.reply({content: "⛔ | You must be in a voice channel in order to be able to use the /play command.", ephemeral: true});
        if (guild.me.voice.channelId && voiceChannel.id !== guild.me.voice.channelId) return interaction.reply({content: `⛔ | I'm already playing music in <#${guild.me.voice.channelId}>.`, ephemeral: true});

        try {
            client.distube.play(voiceChannel, options.getString("song"), {textChannel: channel, member: member});
            if (options.getString("song").includes("/playlist?list=") || options.getString("song").includes("/playlist/")) return interaction.reply({content: "✔️ | All the songs from the playlist are being added to the queue!", ephemeral: true})
            return interaction.reply({content: "✔️ | The song is being added to the queue!", ephemeral: true})
        } catch (error) {
            const errorEmbed = new MessageEmbed()
                .setColor("RED")
                .setTitle("⛔ | An error occurred!")
                .setDescription(`${error}`);
            return interaction.reply({embeds: [errorEmbed]});
        }
    }
}