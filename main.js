const Discord = require('discord.js');
const fs = require('fs');
const DBL = require("dblapi.js");

const Sqlite = require('./db/sqlite');
const Timeout = require('./extensions/timeout');

const utils = require('./utils');

process.on('unhandledRejection', (error) => console.error('Uncaught Promise Rejection', error));

const client = new Discord.Client({
    // According to https://github.com/discordjs/discord.js/blob/stable/src/util/Constants.js#L19
    // this should be set to true to get always the right ammount of members
    // per guild. - zekro
    fetchAllMembers: true
});

const debugMode = process.argv.includes('debug');

try {
    client.config = require('./config.json');
    if (debugMode)
        client.config = client.config.debug;
} catch (err) {
    console.error('[ FATAL ] Failed parsing config.json: ', err);
    process.exit(1);
}

function init() {
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


    // The actual stuff to do
    console.log(`[ INFO ] logged in as ${client.user.tag} (ID: ${client.user.id})`);
    if (client.config.dblToken && client.config.dblToken != '') {
        client.shard.fetchClientValues('guilds.size')
            .then(results => {
                client.dbl.postStats(results.reduce((prev, memberCount) => prev + memberCount, 0));
            })
        setInterval(function() {
            client.shard.fetchClientValues('guilds.size')
                .then(results => {
                    client.dbl.postStats(results.reduce((prev, memberCount) => prev + memberCount, 0));
                })
        }, 300000);
    }
    client.user.setActivity(client.config.prefix + 'help', { type: 'PLAYING' })
        .catch((err) => console.error("[ ERROR ] ", err));

    utils.updateNicknameChanges(client);
    client.setInterval(function() {
        utils.updateNicknameChanges(client);
    }, 30 * 60000);
}

client.on('ready', () => {
    console.log('Ready!');
    init();
});

client.login(client.config.token);

// Workaround for making the client ready if a guild is unavailable
// https://github.com/discordjs/discord.js/issues/3956

setTimeout(() => {
    client.ws.connection.triggerReady();
}, 30000);
