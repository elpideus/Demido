/**
 * Get information about a summoner's stats.
 *
 * @author Stefan Cucoranu <elpideus@gmail.com>
 * @version 1.0.0
 * @licence GPL-v.3
 */
const {MessageEmbed} = require("discord.js");
const axios = require("axios");
const cheerio = require("cheerio");
const { LolApi, Constants } = require('twisted');
const api = new LolApi()

module.exports = {
    name: "lolstats",
    description: "Get the League of Legends statistics of a player",
    options: [
        {
            name: "player",
            description: "The player you want to get info for",
            type: "STRING",
            required: true
        },
        {
            name: "region",
            description: "euw, eune, na, kr, jp, ru, lan, las, br, oce, tr",
            type: "STRING",
            required: false
        },
        ],
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     * @licence GPL-v.3
     */
    async execute(interaction, client) {
        interaction.deferReply({ephemeral: true});
        const player = interaction.options.getString("player");
        const region = ((interaction.options.getString("region") !== null) ? interaction.options.getString("region") : "euw")
        const servers = {
            "br": "BR1",
            "eune": "EUN1",
            "euw": "EUW1",
            "kr": "KR",
            "lan": "LA1",
            "las": "LA2",
            "na": "NA1",
            "oce": "OC1",
            "tr": "TR1",
            "ru": "RU",
            "jp": "JP1"
        }
        try {
            await axios.get(`https://lolprofile.net/index.php?page=summoner&ajaxr=1&region=${region}&name=${player}`).then(
                (async (response) => {
                    const $ = cheerio.load(response.data);
                    const KDA = $('div#matchhistory>div.con2>div.kda').text().replace(/(?:\r\n|\r|\n)/g, "").replace(/\s/g, "") + " (" + $('div#matchhistory>div.con2>div.kda2>span').text().replace(/(?:\r\n|\r|\n)/g, "").replace(/\s/g, "").match(/\d+/g) + ")";
                    const winRate = $('div#matchhistory>div.con2>div.info>span').text().replace(/(?:\r\n|\r|\n)/g, "").replace(/\s/g, "").match(/\d+/g);
                    const mostPlayedChampion = $('div.s-cl>div.a3>div.s-block2>div.s-rc>table.table>tbody>tr:nth-child(1)>td:nth-child(2)>span.champid').text().replace(/(?:\r\n|\r|\n)/g, "").replace(/\s/g, "");
                    const masteryLevel = $('div.s-cl>div.a3>div.s-block2>div.s-rc>table.table>tbody>tr:nth-child(1)>td:nth-child(2)>span.cs').text().replace(/(?:\r\n|\r|\n)/g, "").replace(/\s/g, "");
                    const masteryPoints = $('div.s-cl>div.a3>div.s-block2>div.s-rc>table.table>tbody>tr:nth-child(1)>td:nth-child(4)>span.winrate').text().replace(/(?:\r\n|\r|\n)/g, "").replace(/\s/g, "");
                    const role = $('div.s-cl>div.a2>div.tooltip>div').first().text().replace(/(?:\r\n|\r|\n)/g, "").replace(/\s/g, "") + " " + $('div.s-cl>div.a2>div.tooltip>div').last().text().replace(/(?:\r\n|\r|\n)/g, "").replace(/\s/g, "");
                    const rankedTier = $('div.s-cl>div.a2>div.s-block>div.s-rs-info>span.tier').text().replace(/(?:\r\n|\r|\n)/g, "");
                    const rankedLP = $('div.s-cl>div.a2>div.s-block>div.s-rs-info>span.lp').text().replace(/(?:\r\n|\r|\n)/g, "").replace(/\s/g, "");
                    const rankedWinsLosses = $('div.s-cl>div.a2>div.s-block>div.s-rs-info>span.win-txt').text().replace(/(?:\r\n|\r|\n)/g, "") + " & " + $('div.s-cl>div.a2>div.s-block>div.s-rs-info>span.lose-txt').text().replace(/(?:\r\n|\r|\n)/g, "");
                    try {
                        await api.Summoner.getByName(player, ((region) ? servers[region] : "EUW1")).then((data) => {
                            const lolEmbed = new MessageEmbed()
                                .setThumbnail(`https://ddragon.leagueoflegends.com/cdn/12.4.1/img/profileicon/${data["response"]["profileIconId"]}.png`)
                                .setAuthor({
                                    name: interaction.user.username,
                                    iconURL: interaction.user.avatarURL({dynamic: true, size: 512})
                                })
                                .setDescription(`League of legends information for **${player}**`)
                                .addField("Player KDA", `${KDA} - ${winRate}% Win Rate`, true)
                                .addField("Main role", role, true)
                                .addField("Most played Champ", `${mostPlayedChampion} - ${masteryPoints} (${masteryLevel}) Mastery`)
                            if (rankedTier.length > 3) lolEmbed.addField("Ranked Stats", `${rankedTier}, ${rankedLP}, ${rankedWinsLosses}`)
                            interaction.editReply({embeds: [lolEmbed], ephemeral: true})
                        });
                    } catch (error) {
                        const lolEmbed = new MessageEmbed()
                            .setAuthor({
                                name: interaction.user.username,
                                iconURL: interaction.user.avatarURL({dynamic: true, size: 512})
                            })
                            .setDescription(`League of legends information for **${player}**`)
                            .addField("Player KDA", `${KDA} - ${winRate}% Win Rate`, true)
                            .addField("Main role", role, true)
                            .addField("Most played Champ", `${mostPlayedChampion} - ${masteryPoints} (${masteryLevel}) Mastery`)
                        if (rankedTier.length > 3) lolEmbed.addField("Ranked Stats", `${rankedTier}, ${rankedLP}, ${rankedWinsLosses}`)
                        await interaction.editReply({embeds: [lolEmbed], ephemeral: true})
                    }
                })
            );
        } catch (e) {
            console.error(`${e.message}`);
            await interaction.editReply({content: `⛔ | The player **${player}** does not exist in our database for region **${region}**.`})
        }
    }
}