const Discord = require('discord.js');
const fs = require('fs');
const DBL = require("dblapi.js");

const Sqlite = require('./db/sqlite');
const Timeout = require('./extensions/timeout');

const utils = require('./utils');

const { version } = require('./package.json');
const cliProgress = require('cli-progress');

process.on('unhandledRejection', error => {
	client.logger.error('','Unhandled promise rejection:', error);
});

const client = new Discord.Client({ fetchAllMembers: true });

const debugMode = process.argv.includes('debug');

try {
    client.config = require('./config.json');
    if (debugMode)
        client.config = client.config.debug;
} catch (err) {
    client.logger.fatal('', `Failed parsing config.json: ${err}`);
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



console.log(`Starting MemberCounter#0402\nVersion: ${version}\nDeveloper: ◢◤Myst◢◤#4217 and error2507#2022`)



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
const timer = setInterval(function(){
    value++;
    b1.update(value)
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
        //client.logger.debug('', `Loading command ${file}`)
        client.commands.set(file.split('.')[0], require(`./commands/${file}`));
    }
});
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



    let b2 = new cliProgress.SingleBar({
        format: 'Events   | \x1b[32m{bar} | {percentage}% | {value}/{total}',
        barCompleteChar: '\u2588',
        barIncompleteChar: '=',
        hideCursor: true,
        noTTYOutput: true
    });
    b2.start(6, 0);
    let value2 = 0;
    const timer2 = setInterval(function(){
        value2++;
        b2.update(value2)
        if (value2 >= b2.getTotal()){
            clearInterval(timer2);
            b2.stop();
        }
    }, 400); 

client.login(client.config.token);
