const Discord = require('discord.js');
const DBL = require("dblapi.js");
module.exports.run = (client) => {
    const dbl = new DBL(client.config.dblToken);
    console.log(client.user.tag + " (ID: " + client.user.id + ") is ready.");
    if (!client.config.enabled) {
        dbl.postStats(client.guilds.size);
    setInterval(function() {
        dbl.postStats(client.guilds.size);
    }, 300000);
    client.user.setActivity('%help', { type: 'PLAYING' });
    }
}