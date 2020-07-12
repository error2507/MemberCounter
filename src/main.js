const Discord = require('discord.js');
const fs = require('fs');
const DBL = require('dblapi.js');
const Sqlite = require('./db/sqlite');
const Timeout = require('./extensions/timeout');
const utils = require('./utils');
const { version } = require('./package.json');

const client = new Discord.Client({
	fetchAllMembers: true,
	ws: {
		Intents: ['MESSAGE_CREATE', 'MESSAGE_UPDATE', 'GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_MESSAGE_REACTIONS'],
	},
	disabledEvents: [
		'GUILD_MEMBER_ADD',
		'GUILD_MEMBER_REMOVE',
		'GUILD_MEMBER_UPDATE',
		'GUILD_MEMBERS_CHUNK',
		'GUILD_INTEGRATIONS_UPDATE',
		'GUILD_ROLE_CREATE',
		'GUILD_ROLE_DELETE',
		'GUILD_ROLE_UPDATE',
		'GUILD_BAN_ADD',
		'GUILD_BAN_REMOVE',
		'GUILD_EMOJIS_UPDATE',
		'CHANNEL_PINS_UPDATE',
		'CHANNEL_CREATE',
		'CHANNEL_DELETE',
		'CHANNEL_UPDATE',
		'MESSAGE_DELETE',
		'MESSAGE_DELETE_BULK',
		'MESSAGE_REACTION_REMOVE',
		'MESSAGE_REACTION_REMOVE_ALL',
		'MESSAGE_REACTION_REMOVE_EMOJI',
		'USER_UPDATE',
		'USER_SETTINGS_UPDATE',
		'PRESENCE_UPDATE',
		'TYPING_START',
		'VOICE_STATE_UPDATE',
		'VOICE_SERVER_UPDATE',
		'INVITE_CREATE',
		'INVITE_DELETE',
		'WEBHOOKS_UPDATE',
	],
});

const debugMode = process.argv.includes('debug');

try {
	client.config = require('./config.json');
	if (debugMode) {client.config = client.config.debug;}
}
catch (err) {
	client.logger.fatal('', `Failed parsing config.json: ${err}`);
	process.exit(1);
}
client.on('debug', (message) => {
	// Save this message somewhere
	console.log(message);
});

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

		const dbl = new DBL(client.config.dblToken, { webhookPort: 5000, webhookAuth: 'password' });
		dbl.webhook.on('ready', hook => {
			console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
		});
		dbl.webhook.on('vote', vote => {
			console.log(`User with ID ${vote.user} just voted!`);
		});

	}

});

client.login(client.config.token);
