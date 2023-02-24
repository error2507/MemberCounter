const Discord = require('discord.js');
const fs = require('fs');
const DBL = require("dblapi.js");

const Sqlite = require('./db/sqlite');
const Timeout = require('./extensions/timeout');

const utils = require('./utils');

const client = new Discord.Client({
    intents: ['GuildMembers'],
    // According to https://github.com/discordjs/discord.js/blob/stable/src/util/Constants.js#L19
    // this should be set to true to get always the right ammount of members
    // per guild. - zekro
    fetchAllMembers: true
});

let args = [];
// read arguments
// only existing argument: --config=path/to/file.json
if (process.argv.length > 2) {
    args = process.argv.slice(2);
    try {
        if (args[0].startsWith("--config=")) {
            client.config = require(args[0].split('=')[1]);
        } else {
            throw new Error("No valid config argument found");
        }
    } catch (err) {
        console.log(err)
    }
} else {
    client.config = require('./config.json');
}

/*client.setInterval(function() {
    utils.updateNicknameChanges(client);
}, 30 * 60000);*/

client.embeds = require('./embeds.js');
client.dbl = new DBL(client.config.dblToken);
client.db = new Sqlite(client.config.dbFile);
client.timeout = new Timeout()
    .register('cmdupdate', 30 * 1000, 1);

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
