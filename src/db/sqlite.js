const SQLiteDriver = require('sqlite3');
const DBDriver = require('./dbdriver');
const utils = require('../utils');
const fs = require('fs');

/**
 * Database driver class for SQLite3.
 * @class
 */
module.exports = class Sqlite extends DBDriver {

	/**
     * Creates a new instance of Sqlite and creates
     * required databse structure by using the scheme file
     * in scripts.
     * @param {string} file database file name / location
     */
	constructor(file) {
		super();
		// Creating new instance of SQLiteDriver
		this.db = new SQLiteDriver.Database(file);

		let dbScheme;
		// Try reading database scheme file. On fail -> Panic.
		try {
			dbScheme = fs.readFileSync('./scripts/sqliteScheme.sql').toString();
		}
		catch (err) {
			console.error('[ FATAL ] ./scripts/sqliteScheme.sql could not be found');
			process.exit(1);
		}
		// Split scheme in seperate commands and execute them seperately.
		dbScheme.split(';')
			.filter((c) => c.trim().length > 0)
			.forEach((c) => {
				this.db.run(c, (err, _) => {
					if (err) {console.log('[ ERROR ] [ DB ] failed executing setup query: ', c);}
				});
			});
	}

	/**
     * Returns a Promise which result contains the guilds
     * config.
     * @param {(Object|string)} guild discord.js guild object or guild ID
     * @returns {Promise<GuildConfig, Error>} promise containing the guilds config object.
     *                                        Rejects with error on fail.
     */
	getGuildConfig(guild) {
		// If guild == object, get guild ID from it.
		if (guild.id) {guild = guild.id;}
		return new Promise((resolve, reject) => {
			// Get values of rows format and countBots where guildID == passed guild ID
			this.db.get('SELECT format, countBots FROM guildconfig WHERE guildID = ?', guild, (err, row) => {
				if (err) {
					reject(err);
					return;
				}
				resolve(row ? row : {});
			});
		});
	}

	/**
     * Updates the guild config of the guild.
     * The config object will only be updates, which means, values
     * not set in the passed object will not be touched.
     * @param {(Object|string)} guild discord.js guild object or guild ID
     * @param {Object} config Guild config
     * @returns {Promise<void, Error>} promise
     */
	setGuildConfig(guild, config) {
		// If guild == object, get guild ID from it.
		if (guild.id) {guild = guild.id;}
		// Create sets for each config key + value, for example:
		//   format = "%all% (online: %online%)"
		const sets = Object.keys(config)
			.map((k) => `${k} = ${utils.encapsuleString(config[k])}`)
			.join(', ');
		return new Promise((resolve, reject) => {
			// First, try to update the values assembled above where guildID == passed guild ID
			this.db.run(`UPDATE guildconfig SET ${sets} WHERE guildID = "${guild}"`, (err, res) => {
				// If guildID does not exist in tables guilID column, this query has a 'null' result and error.
				if (!err && !res) {
					// Insert a new row containing the guilds ID and the config keys format and countBots
					this.db.run('INSERT INTO guildconfig (guildID, format, countBots) VALUES (?, ?, ?)',
						guild, config.format, config.countBots, (err, res) => {
							if (err) {
								reject(err);
								return;
							}
						});
				}
				if (err) {
					reject(err);
					return;
				}
				resolve();
			});
		});
	}

};
