const utils = require('../utils');

module.exports.run = (newmember, client) => {
    newmember.guild.fetch(client.user)
    .then(guildMe => {
        if (guildMe.hasPermission("CHANGE_NICKNAME")) {
            utils.setNickname(newmember.guild, client);
        }
    });
};
