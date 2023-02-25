const utils = require('../utils');
const { PermissionFlagsBits } = require('discord.js');

module.exports.run = (newmember, client) => {
    newmember.guild.members.fetchMe()
        .then(guildMe => {
            if (guildMe.permissions.has(PermissionFlagsBits.ChangeNickname)) {
                utils.setNickname(newmember.guild, client);
            }
        });
};