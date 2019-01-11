const Discord = require('discord.js');
const DBL = require("dblapi.js");
module.exports.run = (client) => {
    const dbl = new DBL(client.config.dblToken);
    console.log(client.user.tag + " (ID: " + client.user.id + ") is ready.");
    if (client.config.enabled == false) {
        dbl.postStats(client.guilds.size);
        setInterval(function() {
            dbl.postStats(client.guilds.size);
        }, 300000);
    }
    client.user.setActivity((client.config.debug.enabled == true ? client.config.debug.prefix : client.config.prefix) + 'help', { type: 'PLAYING' });
}