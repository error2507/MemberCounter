const Discord = require('discord.js');
const fs = require('fs');
const DBL = require("dblapi.js");

const Sqlite = require('./db/sqlite');
const Timeout = require('./extensions/timeout');

const utils = require('./utils');

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
    client.logger.fatal('', `Failed parsing config.json: ${err}`)
    // console.error('[ FATAL ] Failed parsing config.json: ', err);
    process.exit(1);
}

client.setInterval(function() {
    utils.updateNicknameChanges(client);
}, 30 * 60000);

client.logger = require('./extensions/logger.js')

client.embeds = require('./embeds.js');
client.dbl = new DBL(client.config.dblToken);
client.db = new Sqlite(client.config.dbFile);
client.timeout = new Timeout()
    .register('cmdupdate', 30 * 1000, 1);



console.log('Starting MemberCounter#0402\nVersion: 1.0.0\nDevloper: ◢◤Myst◢◤#4217 and error2507#2022')
const cliProgress = require('cli-progress')


let b1 = new cliProgress.SingleBar({
    format: 'Commands | \x1b[36m{bar} | {percentage}% | {value}/{total}',
    barCompleteChar: '\u2588',
    barIncompleteChar: '=',
    hideCursor: true,
    noTTYOutput: true
});


b1.start(8, 0);
// the bar value - will be linear incremented
let value = 0;

// 20ms update rate
const timer = setInterval(function(){
    // increment value
    value++;

    // update the bar value
    b1.update(value)
   // b1.increment()

    // set limit
    if (value >= b1.getTotal()){
        // stop timer
        clearInterval(timer);
        b1.stop();
    }
  
}, 200);

// Getting commands from ./commands/
client.commands = new Map();
let commandFiles = fs.readdirSync('./commands');

commandFiles.forEach(file => {
    if (file.endsWith('.js')) {
        //console.log("[ LOADING ] [ COMMAND ] " + file);
        client.commands.set(file.split('.')[0], require(`./commands/${file}`));
    }
});
let b2 = new cliProgress.SingleBar({
    format: 'Events   | \x1b[32m{bar} | {percentage}% | {value}/{total}',
    barCompleteChar: '\u2588',
    barIncompleteChar: '=',
    hideCursor: true,
    noTTYOutput: true
});

b2.start(6, 0);
// the bar value - will be linear incremented
let value2 = 0;

// 20ms update rate
const timer2 = setInterval(function(){
    // increment value
    value2++;

    // update the bar value
    b2.update(value2)
   // b1.increment()

    // set limit
    if (value2 >= b2.getTotal()){
        // stop timer
        clearInterval(timer2);

        b2.stop();

    }
}, 400); 

// Getting events from ./events/
let eventFiles = fs.readdirSync('./events');
eventFiles.forEach(file => {
    if (file.endsWith('.js')) {
      
        //client.logger.loading('', `Loading event ${file}`)
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => {
            eventFunction.run(...args, client);
        });
    }
});

client.login(client.config.token);
