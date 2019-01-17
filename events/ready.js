module.exports.run = (client) => {
    console.log(`[ INFO ] logged in as ${client.user.tag} (ID: ${client.user.id})`);
    if (client.config.dblToken && client.config.dblToken != '') {
        client.dbl.postStats(client.guilds.size);
        setInterval(function() {
            client.dbl.postStats(client.guilds.size);
        }, 300000);
    }
    client.user.setActivity(client.config.prefix + 'help', { type: 'PLAYING' })
        .catch((err) => console.error("[ ERROR ] ", err));
};