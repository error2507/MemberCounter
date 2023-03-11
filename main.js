const Discord = require('discord.js');
const fs = require('fs');
const DBL = require("dblapi.js");
const process = require("process");
const commandLineArgs = require('command-line-args');

const Sqlite = require('./db/sqlite');
const Timeout = require('./extensions/timeout');

const utils = require('./utils');

const client = new Discord.Client({
    intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMembers],
    partials: [Discord.Partials.GuildMember, Discord.Partials.User],
    // According to https://github.com/discordjs/discord.js/blob/stable/src/util/Constants.js#L19
    // this should be set to true to get always the right ammount of members
    // per guild. - zekro
    fetchAllMembers: true
});

// look out for the user specifying a custom config or if new commands should be registered
const optionDefinitions = [
    {
        name: 'setup-commands',
        alias: 's',
        type: Boolean,
        defaultValue: false
    },
    {
        name: 'config',
        alias: 'c',
        type: String,
        defaultValue: __dirname + '/config.json'
    }
]
const args = commandLineArgs(optionDefinitions);
// try to get the specified config
try {
    client.config = require(args.config);
} catch (err) {
    console.error("FATAL ERROR Could not load " + args.config + " as config");
    process.exit(5);
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
