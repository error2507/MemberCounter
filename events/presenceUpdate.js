const utils = require('../utils');

module.exports.run = (oldmember, newmember, client) => {
    if (oldmember.presence.status != newmember.presence.status) {
        if (newmember.guild.me.hasPermission("CHANGE_NICKNAME") || newmember.guild.me.hasPermission("ADMINISTRATOR")) {
            utils.setNickname(newmember.guild, client);
        }
    }
};