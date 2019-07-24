const utils = require('../utils');

module.exports.run = (newmember, client) => {
    let guildMe = newmember.guild.fetchMember(client.user);
    if (guildMe.hasPermission("CHANGE_NICKNAME")) {
        utils.setNickname(newmember.guild, client);
    }
};