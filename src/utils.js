let nicknameChanges = 0;
module.exports = {

	getMemberCount(guild, client) {
		if (!guild) {return 0;}
		return new Promise((resolve, reject) => {
			client.db.getGuildConfig(guild).then((cfg) => {
				const membs = guild.members.cache.filter((m) => cfg.countBots || !m.user.bot);
				const all = membs.size;
				const online = membs.filter((m) => m.presence.status != 'offline').size;
				const offline = all - online;
				resolve({ all, online, offline });
			}).catch(reject);
		});
	},

	formatCount(countObj, format) {
		if (!format) {format = '%all%';}
		Object.keys(countObj)
			.forEach((k) => {
				format = format.replace(`%${k}%`, countObj[k]);
			});
		return format;
	},

	setNickname(guild, client, cb) {
		this.getMemberCount(guild, client).then((count) => {
			client.db.getGuildConfig(guild).then((cfg) => {
				const formated = this.formatCount(count, cfg.format);

				guild.members.fetch(client.user.id).then(guildMe => {
					guildMe.setNickname(formated)
						.then(() => nicknameChanges++);
				});
				if (cb) cb(formated);
			});
		});
	},

	updateNicknameChanges(client) {
		if (nicknameChanges > 0) {
			const statsChannel = client.guilds.cache.get(client.config.supportGuild).channels.cache.find(c => c.name.startsWith('Nickname changes:'));
			const changedBefore = parseInt(statsChannel.name.split(': ').slice(1), 10);
			statsChannel.setName(`Nickname changes: ${changedBefore + nicknameChanges}`);
			nicknameChanges = 0;
		}
	},

	encapsuleString(data) {
		if (typeof data == 'string') {return '"' + data + '"';}
		return data;
	},

};
