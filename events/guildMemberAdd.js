const utils = require('../utils');

module.exports.run = (newmember, client) => {
    if (newmember.guild.me.hasPermission("CHANGE_NICKNAME") || newmember.guild.me.hasPermission("ADMINISTRATOR")) {
        utils.setNickname(newmember.guild, client)
        	.catch((err) => console.error("[ ERROR ] ", err));
    }
};