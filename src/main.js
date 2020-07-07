const Discord = require('discord.js');
const fs = require('fs');
const DBL = require('dblapi.js');
const Sqlite = require('./db/sqlite');
const Timeout = require('./extensions/timeout');
const utils = require('./utils');
const { version } = require('./package.json');

process.on('unhandledRejection', error => {
	client.logger.error('', 'Unhandled promise rejection:', error);
});

const client = new Discord.Client({ fetchAllMembers: true });

const debugMode = process.argv.includes('debug');

try {
	client.config = require('./config.json');
	if (debugMode) {client.config = client.config.debug;}
}
catch (err) {
	client.logger.fatal('', `Failed parsing config.json: ${err}`);
	process.exit(1);
}


function init() {
	client.setInterval(function() {
		utils.updateNicknameChanges(client);
	}, 30 * 60000);

	client.logger = require('./extensions/logger.js');

	client.embeds = require('./embeds.js');
	client.dbl = new DBL(client.config.dblToken);
	client.db = new Sqlite(client.config.dbFile);
	client.timeout = new Timeout()
		.register('cmdupdate', 30 * 1000, 1);


	// console.log(`Version: ${version}\nDeveloper: ◢◤Myst◢◤#4217 and error2507#2022`)
	client.logger.info('', `MemberCounter#0402 v${version}`);

	// Getting commands from ./commands/
	client.commands = new Map();
	const commandFiles = fs.readdirSync('./commands');
	commandFiles.forEach(file => {
		if (file.endsWith('.js')) {
			// client.logger.debug('', `Loading command ${file}`)
			client.commands.set(file.split('.')[0], require(`./commands/${file}`));
		}
	});
	// Getting events from ./events/
	const eventFiles = fs.readdirSync('./events');
	eventFiles.forEach(file => {
		if (file.endsWith('.js')) {
			// client.logger.loading('', `Loading event ${file}`)
			const eventFunction = require(`./events/${file}`);
			const eventName = file.split('.')[0];
			client.on(eventName, (...args) => {
				eventFunction.run(...args, client);
			});
		}
	});

}
client.on('ready', () => {
	init();

	client.user.setActivity(client.config.prefix + 'help', { type: 'PLAYING' })
		.catch((err) => client.logger.error('', err));

	client.logger.info('Bot', `Logged in as ${client.user.tag} (ID: ${client.user.id})`);

	if (client.config.dblToken && client.config.dblToken != '') {
		client.shard.fetchClientValues('guilds.cache.size')
			.then(results => {
				client.dbl.postStats(results.reduce((prev, memberCount) => prev + memberCount, 0));
			});
		setInterval(function() {
			client.shard.fetchClientValues('guilds.cache.size')
				.then(results => {
					client.dbl.postStats(results.reduce((prev, memberCount) => prev + memberCount, 0));
				});
		}, 300000);

	}

});
/*
client.on('debug', (message) => {
    console.log(message)
});*/
client.login(client.config.token);
