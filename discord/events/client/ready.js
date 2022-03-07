module.exports = {
    name: "ready",
    once: "true",
    /**
     * @param {Client} client
     * @licence GPL-3.0
     */
    execute(client) {
        client.user.setActivity("Hentai", {type: "WATCHING"})
        console.log("Demido at your service, sir!")
    }
}