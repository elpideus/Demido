const {ContextMenuInteraction, MessageEmbed} = require("discord.js");

module.exports = {
    name: "userInfo",
    type: "USER",
    context: true,
    /**
     * @param {ContextMenuInteraction} interaction
     * @licence GPL-v.3
     */
    async execute(interaction) {
        const target = await interaction.guild.members.fetch(interaction.targetId);
        const userRoles = target.roles.cache.map(r => r).join(" ").replace("@everyone", " ")
        const response = new MessageEmbed()
            .setColor("AQUA")
            .setAuthor({name: target.user.tag, iconURL: target.user.avatarURL({dynamic: true, size: 512})})
            .setThumbnail(target.user.avatarURL({dynamic: true, size: 512}))
            .addField("ID", `${target.id}`, true)
            .addField("Roles", `${((userRoles.length > 2) ? userRoles : "None")}`, false)
            .addField("Member Since", `<t:${parseInt(target.joinedTimestamp/1000)}:R>`, true)
            .addField("Discord user since", `<t:${parseInt(target.user.createdTimestamp/1000)}:R>`, true)

        interaction.reply({embeds: [response], ephemeral: true})
    }
}