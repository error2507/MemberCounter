const Discord = require('discord.js');
const fs = require('fs');
const DBL = require('dblapi.js');
const Sqlite = require('./db/sqlite');
const Timeout = require('./extensions/timeout');
const utils = require('./utils');


class Membercounter extends Discord.Client {
	constructor() {
		super({
			disableMentions: 'everyone',
			messageCacheMaxSize: 50,
			messageCacheLifetime: 60,
			messageSweepInterval: 120,
			ws: {
				Intents: ['MESSAGE_CREATE', 'MESSAGE_UPDATE', 'GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_MESSAGE_REACTIONS', 'GUILD_MEMBER_ADD', 'GUILD_MEMBER_REMOVE',],
			},
			disabledEvents: [
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
			]
		});
		this.config = require('./config.json');
		this.logger = require('./extensions/logger.js');
		this.embeds = require('./embeds.js');
		this.embed = require('./extensions/embed');
		this.nicknameChanges = 0;
		this.dbl = new DBL(this.config.dblToken);
		this.db = new Sqlite(this.config.dbFile);
		this.commands = new Map();
	}
}

const client = new Membercounter();

// Set the debug config as config when debug mode is enabled
const debugMode = process.argv.includes('debug');
try {
	if (debugMode) {client.config = client.config.debug;}
}
catch (err) {
	client.logger.fatal('', `Failed parsing config.json: ${err}`);
	process.exit(1);
}

// Update the nickname changes channel
client.setInterval(function() {
	utils.updateNicknameChanges(client);
}, /*30 * 60000*/10000);


client.timeout = new Timeout()
	.register('cmdupdate', 30 * 1000, 1);

// Getting commands from ./commands/
//client.commands = new Map();
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
		// client.logger.debug('', `Loading event ${file}`)
		const eventFunction = require(`./events/${file}`);
		const eventName = file.split('.')[0];
		client.on(eventName, (...args) => {
			eventFunction.run(...args, client);
		});
	}
});

client.login(client.config.token);