module.exports = {

    getMemberCount(guild, client) {
        if (!guild)
            return 0;
       	let countBots = client.db.get(`guilds.${msg.guild.id}.config.countBots`).value();
        let membs = guild.members.filter((m) => countBots || !m.user.bot);
        let all = membs.size;
        let online = membs.filter((m) => m.user.status != 'offline').size;
        let offline = all - online;
        return {all, online, offline};
    },

    formatCount(countObj, format) {
    	Object.keys(countObj)
    		.forEach((k) => {
    			format = format.replace(`%${k}%`, countObj[k]);
    		});
    	return format;
    },

    setNickname(guild, client) {
    	let count = this.getMemberCount(guild, client);
    	let format = client.db.get(`guilds.${msg.guild.id}.config.format`).value();
    	let formated = this.formatCount(count, format);
    	return guild.me.setNickname(formated);
    },

};