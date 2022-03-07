# DEMIDO - The official bot of [AXE Community](https://discord.gg/qMaZ2dpSHP)

---
> The code in this repository is part of the entire bot. It is not intended for distribution as most of the required modules are not available in this public distribution.

<img src="./logo.png" width="300px">

**Demido** is a personal project that took a lot of time and effort to create. Its main purpose is to make the repetitive and boring tasks in the community easier.
The bot can play music, play games, manage the server, and much more. It can be also be controlled by using voice assistants like [Amazon Alexa](https://en.wikipedia.org/wiki/Amazon_Alexa).

---

### There are many commands that can be used to control the bot.
#### Music comands:
+ `/play <song>` - Plays the requested song in your current voice channel.
+ `/stop` - Stops the currently playing song.
+ `/skip` - Plays the next song in the queue.
+ `/queue` - Shows the current queue, a list of tracks that will be played one after each other.
+ `/lofi` - Plays some random LoFi songs.
+ `/shuffle` - Shuffles the current queue so the songs are played in a different order.
#### Game commands:
+ `/dice` - Rolls a dice and gives a random number from 1 to 6.
+ `russianroulette <[players]>` - Starts a game of Russian Roulette. There can be up to 8 players per match. Only server members can participate.
+ `lolstats <player>` - Shows the stats of a player in League of Legends. (KDA, main role, etc.)
#### Management commands:
+ `/clearchat <*amount of messages (n)>` - Clears the chat where this command is being sent in. If an amount of messages is set then the bot only deletes the last **n** messages.

---

### TODO:
+ Add a Telegram integration.
+ Add more games.
+ Add a meme creator.
+ Add anime-related features.
+ Add some more features.

---

Demido was developed in Javascript (node) and the main packages used by this project are: 
[DiscordJs](https://discord.js.org/), 
[Distube](https://distube.js.org/),
[Express](https://expressjs.com/),
[Axios](https://github.com/axios/axios), 
[Cheerio](https://cheerio.js.org/),
[YTDL](https://github.com/fent/node-ytdl-core),
[DotEnv](https://github.com/motdotla/dotenv) and many more.

>The code in this repository may be used by anyone to create their own bots as long as the license remains the same.