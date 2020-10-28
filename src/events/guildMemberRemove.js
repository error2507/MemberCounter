const utils = require('../utils');

module.exports.run = (oldmember, client) => {
	oldmember.guild.members.fetch(client.user)
		.then(guildMe => {
			if (guildMe.hasPermission('CHANGE_NICKNAME')) {
				utils.setNickname(oldmember.guild, client);
			}
		});
};