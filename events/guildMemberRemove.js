const utils = require('../utils');

module.exports.run = (oldmember, client) => {
    let guildMe = oldmember.guild.fetchMember(client.user);
    if (guildMe.hasPermission("CHANGE_NICKNAME")) {
        utils.setNickname(oldmember.guild, client);
    }
};