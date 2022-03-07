/**
 * Just allows the users to play Russian Roulette. Only users from the server can be selected.
 * There are 8 bullets in the revolver, and each bullet has a chance to be fired.
 * If the bullet is fired, the user loses.
 *
 * @author Stefan Cucoranu <elpideus@gmail.com>
 * @version 1.0.0
 * @licence GPL-3.0
 */

const {CommandInteraction} = require("discord.js");

module.exports = {
    name: "russianroulette",
    description: "Don't try this at home",
    options: [
        {
            name: "player1",
            description: "The first player.",
            type: "USER",
            required: false
        },
        {
            name: "player2",
            description: "The second player.",
            type: "USER",
            required: false
        },
        {
            name: "player3",
            description: "The third player.",
            type: "USER",
            required: false
        },
        {
            name: "player4",
            description: "The fourth player.",
            type: "USER",
            required: false
        },
        {
            name: "player5",
            description: "The fifth player.",
            type: "USER",
            required: false
        },
        {
            name: "player6",
            description: "The sixth player.",
            type: "USER",
            required: false
        },
        {
            name: "player7",
            description: "The seventh player.",
            type: "USER",
            required: false
        },
        {
            name: "player8",
            description: "The eighth player.",
            type: "USER",
            required: false
        },
    ],
    /**
     * Play the russian roulette with your friend in a safe way...hehe.
     *
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const $ = (number) => {return interaction.options.getUser(`player${number}`)}; let playersDefined = 0;
        interaction.deferReply();
        let participatingPlayers = [];
        for (let i = 0; i < 8; i++) if ($(i + 1) !== null) playersDefined += 1;
        let gamePlayers = [];
        if (playersDefined > 0) {
            for (let i = 0; i < 8; i++) if ($(i + 1) !== null) participatingPlayers.push($(i + 1).username);
            gamePlayers = Array.from({length: 8}, () => participatingPlayers).flat().slice(0, 8);
        }
        let round = 1;
        const dead = Math.floor(Math.random() * 8) + 1;
        for (let i = 0; i < dead; i++) {
            if (playersDefined > 0) {
                await new Promise(resolve => setTimeout(resolve, 3000)).then(r => {interaction.editReply(`\`Round ${i + 1}:\` **${gamePlayers[i]}** is alive (for now)`);});
                round++; continue;
            }
            await new Promise(resolve => setTimeout(resolve, 3000)).then(r => {interaction.editReply(`\`Round ${i + 1}:\` You are alive (for now)`);});
            round++;
        }
        await new Promise(resolve => setTimeout(resolve, 3000)).then(r => {interaction.editReply(((playersDefined > 0) ? `\`Round ${round}:\` Sadly **${gamePlayers[dead]}** died.` : `\`Round ${round}:\` Sadly you are dead.`)); new Promise(resolve => setTimeout(resolve, 10000)).then(r => {try{interaction.deleteReply();}catch (error) {}})});
    }
}