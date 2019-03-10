const utils = require('../utils');

module.exports.run = (oldmember, client) => {
    if (oldmember.guild.me.hasPermission("CHANGE_NICKNAME") || oldmember.guild.me.hasPermission("ADMINISTRATOR")) {
        utils.setNickname(oldmember.guild, client);
    }
};