/**
 * Plays some LoFi music. It is not fully random yet and the system can be improved further.
 * Playlists are not retrieved dynamically but from a hardcoded array.
 *
 * @author Stefan Cucoranu <elpideus@gmail.com>
 * @version 1.0.0
 * @licence GPL-v.3
 */

// TODO: Make this fully random.
// TODO: Dynamically retrieve playlists.

const {CommandInteraction} = require("discord.js");

async function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

const playLists = [
    "https://www.youtube.com/playlist?list=PLPqmFSQbpGoTKXwQAu7EMJJhAJPn4-vD8",
    "https://www.youtube.com/playlist?list=PLuDoiEqVUgejiZy0AOEEOLY2YFFXncwEA",
    "https://www.youtube.com/playlist?list=PLNL9210pN7vZOQWQKpc-_bhnuWncytzZT",
    "https://www.youtube.com/playlist?list=PL6NdkXsPL07IOu1AZ2Y2lGNYfjDStyT6O",
    "https://www.youtube.com/playlist?list=PL1EYrjEetC_egoTzQy2Srvf8_BwwEBmWX",
    "https://www.youtube.com/playlist?list=PLl578ZPbYIlFcSxuka8Km37VgbUYUWI5p",
    "https://www.youtube.com/playlist?list=PLCnZsxXddm5U28-l_lamQZ_zIEUwn7i_a",
    "https://www.youtube.com/playlist?list=PL6fhs6TSspZszor_x46PxP6USKFLV_Dze",
    "https://www.youtube.com/playlist?list=PLuDoiEqVUgegWFXgllgj1pL3JkeVfKA4m",
    "https://www.youtube.com/playlist?list=PLL9QCLRXRDebosw-YV-GaknLxVuljU4jO",
    "https://www.youtube.com/playlist?list=PL6fhs6TSspZuk0DveWiXNgJAG5onnwvYL",
    "https://www.youtube.com/playlist?list=PLOzDu-MXXLlg2gSfrywPGN6iCeNat_yB7",
    "https://www.youtube.com/playlist?list=PLq_a_lnjwT4Vdd1h5CEHwu-ykTlRXH6AO",
    "https://www.youtube.com/playlist?list=PL3w_WP01mHHbNrAkXAuVE5rA6E82h0mqf",
    "https://www.youtube.com/playlist?list=PLzoc7vfWgFvr2IKgwLoUo5zzg4EItodiv",
    "https://www.youtube.com/playlist?list=PLt7bG0K25iXj2h1eql20RZIPB_2CtK659",
    "https://www.youtube.com/playlist?list=PL_77ETNrRb7Ep0Zv3tQNLNxQgwTsTHNrV",
    "https://www.youtube.com/playlist?list=PLKb6iserGGjAe-J4l5zHqErQTq1dw5Fvh",
    "https://www.youtube.com/playlist?list=PLCepNLUCLQBISEU3NNoRPbX19OC_QF-Aa",
    "https://www.youtube.com/playlist?list=PLOzDu-MXXLljl1tV6em0XnZS6LWs-gky3"
]

module.exports = {
    name: "lofi",
    description: "Play some lo-fi music to chill, study and relax",
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     * @licence GPL-v.3
     */
    async execute(interaction, client) {
        const {member, channel} = interaction;
        const voiceChannel = interaction.member.voice.channel;
        const shuffledPlayLists = await shuffle(playLists);
        client.distube.play(voiceChannel, shuffledPlayLists[0], {textChannel: channel, member: member});
        shuffledPlayLists.splice(0, 1);
        new Promise(resolve => setTimeout(resolve, 10000)).then((r) => {
            for (const playlist of shuffledPlayLists) {
                new Promise(resolve => setTimeout(resolve, 6000)).then((r) => {
                    client.distube.play(voiceChannel, playlist, {textChannel: channel, member: member});
                })
            }
        })
        new Promise(resolve => setTimeout(resolve, 20000)).then((r) => {client.distube.getQueue(voiceChannel).shuffle();});
    }
}