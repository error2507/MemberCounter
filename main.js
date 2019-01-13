const Discord = require('discord.js');
const fs = require('fs');
const DBL = require("dblapi.js");
const client = new Discord.Client();
client.config = require('./config.json');
client.embeds = require('./embeds.js');
client.dbl = new DBL(client.config.dblToken);


// Getting commands from ./commands/
client.commands = new Map();
let commandFiles = fs.readdirSync('./commands');
commandFiles.forEach(file => {
    if (file.endsWith('.js')) {
        console.log("[ LOADING ] [ COMMAND ] " + file);
        client.commands.set(file.split('.')[0], require(`./commands/${file}`));
    }
});


// Getting events from ./events/
let eventFiles = fs.readdirSync('./events');
eventFiles.forEach(file => {
    if (file.endsWith('.js')) {
        console.log("[ LOADING ] [ EVENT ] " + file);
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => {
            eventFunction.run(...args, client);
        });
    }
});

client.login((client.config.debug.enabled == true ? client.config.debug.token : client.config.token));