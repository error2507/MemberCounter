const utils = require('../utils');

module.exports.run = (newmember, client) => {
    newmember.guild.fetchMember(client.user)
    .then(guildMe => {
        if (guildMe.hasPermission("CHANGE_NICKNAME")) {
            utils.setNickname(newmember.guild, client);
        }
    })
};