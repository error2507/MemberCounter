var SQLiteDriver = require('sqlite3');
var DBDriver = require('./dbdriver');
var utils = require('../utils');
var fs = require('fs');

/**
 * Database driver class for SQLite3.
 * @class
 */
module.exports = class Sqlite extends DBDriver {

    /**
     * Creates a new instance of Sqlite and creates
     * required 
     * @param {stirng} file database file name / location 
     */
    constructor(file) {
        super();
        this.db = new SQLiteDriver.Database(file);
        
        let dbScheme;
        try {
            dbScheme = fs.readFileSync('./scripts/sqliteScheme.sql').toString();
        } catch (err) {
            console.error('[ FATAL ] ./scripts/sqliteScheme.sql could not be found');
            process.exit(1);
        }
        dbScheme.split(';')
            .filter((c) => c.trim().length > 0)
            .forEach((c) => {
                this.db.run(c, (err, _) => {
                    if (err)
                        console.log('[ ERROR ] [ DB ] failed executing setup query: ', c);
                });
            });
    }

    getGuildConfig(guild) {
        if (guild.id)
            guild = guild.id;
        return new Promise((resolve, reject) => {
            this.db.get('SELECT format, countBots FROM guildconfig WHERE guildID = ?', guild, (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(row ? row : {});
            });
        });
    }

    setGuildConfig(guild, config) {
        if (guild.id)
            guild = guild.id;
        let sets = Object.keys(config)
            .map((k) => `${k} = ${utils.encapsuleString(config[k])}`)
            .join(', ');
        return new Promise((resolve, reject) => {
            this.db.run(`UPDATE guildconfig SET ${sets} WHERE guildID = "${guild}"`, (err, res) => {
                if (!err && !res) {
                    this.db.run(`INSERT INTO guildconfig (guildID, format, countBots) VALUES (?, ?, ?)`, 
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
