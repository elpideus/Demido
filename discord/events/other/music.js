const client = require("../../discord");
const {MessageEmbed} = require("discord.js");
const linkValidation = require("../../validation/linkValidation")

let nowPlayingMessage;
client.distube
    .on('playSong', async (queue, song) => {
            const playEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setURL(song.url)
                .setAuthor({name: String(song.user.username), iconURL: song.user.avatarURL({dynamic: true, size: 512})})
                .setThumbnail(song.thumbnail)
                .addField("Now Playing", song.name)
                .addField("Channel", `[${song.uploader.name}](${song.uploader.url})`, true)
                .addField("Duration", song.formattedDuration, true)
                .addField("Link", `[${(await linkValidation(song.url))}](${song.url})`);
            queue.textChannel.send({embeds: [playEmbed]}).then((msg) => {
                nowPlayingMessage = msg;
            });
            client.user.setActivity(song.name, {type: "LISTENING"})
        }
    )
    .on('finishSong', () => {try {nowPlayingMessage.delete();} catch (error) {} nowPlayingMessage = null; client.user.setActivity("Hentai", {type: "WATCHING"})})
    .on('addSong', async (queue, song) => {
            const newSong = new MessageEmbed()
                .setColor("GREEN")
                .setDescription("A new song has been added to the queue.")
                .setURL(song.url)
                .setAuthor({name: String(song.user.username), iconURL: song.user.avatarURL({dynamic: true, size: 512})})
                .setThumbnail(song.thumbnail)
                .addField("Song", song.name)
                .addField("Channel", `[${song.uploader.name}](${song.uploader.url})`, true)
                .addField("Duration", song.formattedDuration, true)
                .addField("Added by", song.user.username, true)
            queue.textChannel.send({embeds: [newSong]}).then((msg) => {new Promise(resolve => setTimeout(resolve, 20000)).then(r => {try{msg.delete();}catch (error) {}});});
        }
    )
    .on('addList', async (queue, playlist) => {
            const newPlaylist = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`${playlist.songs.length} songs have been added to the queue.`)
                .setURL(playlist.url)
                .setAuthor({name: String(playlist.user.username), iconURL: playlist.user.avatarURL({dynamic: true, size: 512})})
                .setThumbnail(playlist.thumbnail)
                .addField("Playlist", playlist.name)
                .addField("Duration", playlist.formattedDuration, true)
                .addField("Added by", playlist.user.username, true);
            queue.textChannel.send({embeds: [newPlaylist]}).then((msg) => {new Promise(resolve => setTimeout(resolve, 20000)).then(r => {try{msg.delete();}catch (error) {}});});
        }
    )
    .on('error', async (channel, e) => {
        channel.send(`⛔ | An error encountered: ${e.toString().slice(0, 1974).replace("DisTubeError ", "")}`)
        console.error(e)
    })
    .on('searchNoResult', async (message, query) =>
        message.channel.send(`⛔ | No result found for \`${query}\`!`)
    );