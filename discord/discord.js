/**
 * This is the core of the discord bot. Basically in this fil the client gets initialized and gets
 * exported as a module.
 *
 * @version 1.0.0
 * @licence GPL-v.3
 */

require('dotenv').config();
const {Client, Collection} = require("discord.js");
const {DisTube} = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const {SoundCloudPlugin} = require("@distube/soundcloud"); // Spotify Plugin for Distube
const client = new Client({intents: 32767});
require("./handlers/events")(client) // Load the events
require("./handlers/commands")(client) // Load the commands

client.commands = new Collection();
client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: true,
    emitAddSongWhenCreatingQueue: false,
    youtubeDL: false,
    plugins: [
        new SpotifyPlugin({parallel: true, emitEventsAfterFetching: false, api: {clientId: process.env.SPOTIFY_CLIENT_ID, clientSecret: process.env.SPOTIFY_SECRET_ID}}),
        new SoundCloudPlugin()
    ]
});
module.exports = client;
client.login(process.env.DISCORD_API_TOKEN) // start the bot