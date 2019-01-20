var SQLiteDriver = require('sqlite3');
var DBDriver = require('./dbdriver');

module.exports = class Sqlite extends DBDriver {

    constructor(file) {
        super();
        this.db = new SQLiteDriver.Database(file);
        this.db.exec("CREATE TABLE IF NOT EXISTS `guildconfig` ( `guildID` text, `format` text, `countBots` tinyint(1) NOT NULL DEFAULT '1' );");
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
            .map((k) => {
                let value = config[k];
                if (typeof value == 'string')
                    value = '"' + value + '"';
                return `${k} = ${value}`;
            }).join(', ');
        return new Promise((resolve, reject) => {
            this.db.run(`UPDATE guildconfig SET ${sets} WHERE guildID = "${guild}"`, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }

};
