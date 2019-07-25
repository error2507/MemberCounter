const utils = require('../utils');

module.exports.run = (oldmember, client) => {
    oldmember.guild.fetchMember(client.user)
    .then(guildMe => {
        if (guildMe.hasPermission("CHANGE_NICKNAME")) {
            utils.setNickname(newmember.guild, client);
        }
    })
};