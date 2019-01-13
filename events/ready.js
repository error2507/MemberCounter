module.exports.run = (client) => {
    console.log(client.user.tag + " (ID: " + client.user.id + ") is ready.");
    if (!client.config.enabled) {
        client.dbl.postStats(client.guilds.size);
        setInterval(function() {
            client.dbl.postStats(client.guilds.size);
        }, 300000);
    }
    client.user.setActivity((client.config.debug.enabled == true ? client.config.debug.prefix : client.config.prefix) + 'help', { type: 'PLAYING' });
}