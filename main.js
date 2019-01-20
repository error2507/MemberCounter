const Discord = require('discord.js');
const fs = require('fs');
const DBL = require("dblapi.js");

const Sqlite = require('./db/sqlite');

const client = new Discord.Client({
    // According to https://github.com/discordjs/discord.js/blob/stable/src/util/Constants.js#L19
    // this should be set to true to get always the right ammount of members
    // per guild. - zekro
    fetchAllMembers: true
});

var debugMode = process.argv.includes('debug');

try {
    client.config = require('./config.json');
    if (debugMode)
        client.config = client.config.debug;
} catch (err) {
    console.error('[ FATAL ] Failed parsing config.json: ', err);
    process.exit(1);
}

client.embeds = require('./embeds.js');
client.dbl = new DBL(client.config.dblToken);
client.db = new Sqlite(client.config.dbFile);

client.db.getGuildConfig('526196711962705925');

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

client.login(client.config.token);