const Discord = require('discord.js');
module.exports = (client) => {
    const dbl = new DBL(client.config.dblToken);
    console.log(client.user.tag + " (ID: " + client.user.id + ") is ready.");
    console.log("MemberCounter is ready!");
    if (!client.config.enabled) {
        dbl.postStats(client.guilds.size);
    setInterval(function() {
        dbl.postStats(client.guilds.size);
    }, 300000);
    client.user.setActivity('%help', { type: 'PLAYING' });
    }
}