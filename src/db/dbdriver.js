/**
 * General abstract class for defining database drivers.
 * @abstract
 * @class
 */
module.exports = class DBDriver {

	/**
     * You should use the constructor to open or connect
     * to the database and pass the settings and credentials.
     * @abstract
     * @constructor
     */
	constructor() {}

	/**
     * Returns guild config
     * @abstract
     * @param {(Object|string)} guild Guild as object or guilds ID
     * @returns {Promise<GuildConfig, Error>} Promise passing guild config containing 'format' (string)
     *                                        and 'countBots' (bool) on pass
     */
	getGuildConfig(guild) {
		throw Error('getGuildConfig() must be implemented');
	}

	/**
     * Sets guilds config
     * @abstract
     * @param {(Object|string)} guild              Guild as object or guilds ID
     * @param {Object}          config             Guild config data
     * @param {string}          [config.format]    format
     * @param {bool}            [config.countBots] countBots
     * @returns {Promise<void, Error>} Promise
     */
	setGuildConfig(guild, config) {
		throw Error('setGuildConfig() must be implemented');
	}

};