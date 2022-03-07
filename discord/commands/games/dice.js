const {CommandInteraction} = require("discord.js");

module.exports = {
    name: "dice",
    aliases: ["dices"],
    description: "Rolls a dice",
    /**
     * Rolls a dice and gives a random number. Now this is software engineering at its peak!
     *
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        interaction.deferReply();
        new Promise(resolve => setTimeout(resolve, 3000)).then(r => {interaction.editReply({content: `The lucky number is **${Math.floor(Math.random() * 6) + 1}.**`}); new Promise(resolve => setTimeout(resolve, 20000)).then(r => {try{interaction.deleteReply();}catch (error) {}})});
    }
}