const utils = require('../utils');

module.exports.run = (oldmember, client) => {
    oldmember.guild.fetchMember(client.user).then(() => {
        if (oldmember.guild.me.hasPermission("CHANGE_NICKNAME") || oldmember.guild.me.hasPermission("ADMINISTRATOR")) {
            utils.setNickname(oldmember.guild, client)
            	.catch((err) => console.error("[ ERROR ] ", err));
        }
    }).ctach((err) => console.error("[ ERROR ] ", err));
};