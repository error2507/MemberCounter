const axios = require('axios');

let nicknameChanges = 0;
module.exports = {

    getMemberCount(guild, client) {
        if (!guild)
            return 0;
        return new Promise((resolve, reject) => {
            client.db.getGuildConfig(guild).then(async (cfg) => {
                let allFetchedMembers = await guild.members.fetch();
                // all means all filtered members (including online and offline, might exclude bots, depending on the config)
                let all = allFetchedMembers.filter((m) => cfg.countBots || !m.user.bot).size;;
                /* online/offline members are not shown atm
                let online = membs.filter((m) => m.presence.status != 'offline').size;
                let offline = all - online;
                */
                resolve({all/*, online, offline*/});
            }).catch(reject);
        });
    },

    formatCount(countObj, format) {
        if (!format)
            format = "%all%";
        Object.keys(countObj)
            .forEach((k) => {
                format = format.replace(`%${k}%`, countObj[k]);
            });
        return format;
    },

    setNickname(guild, client, cb) {
        this.getMemberCount(guild, client).then((count) => {
            client.db.getGuildConfig(guild).then((cfg) => {
                let formated = this.formatCount(count, cfg.format);
                guild.members.fetchMe().then(guildMe => {
                    guildMe.setNickname(formated, "Updated membercount | https://top.gg/bot/448845486515027970")
                    .then(() => nicknameChanges++);
                });
                if (cb) cb(formated);
            });
        });
    },

    async updateTopGGStats(ShardingManager, topToken) {
        const guildCounts = await ShardingManager.fetchClientValues('guilds.cache.size')
        const addedUpGuildCount = guildCounts.reduce((prev, memberCount) => prev + memberCount, 0);
        const shardCount = ShardingManager.totalShards;
        const clientId = await ShardingManager.shards.first().fetchClientValue('user.id');

        axios.post(`https://top.gg/api/bots/${clientId}/stats`, {
            server_count: addedUpGuildCount,
            shard_count: shardCount
        }, {
            headers: {
                'Authorization': topToken
            }
        })
        .catch((err) => console.error("[ ERROR ] While posting stats to top.gg", err));
    },

    encapsuleString(data) {
        if (typeof data == 'string')
            return '"' + data + '"'
        return data;
    }

};