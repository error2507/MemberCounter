const utils = require('../utils');
const { PermissionFlagsBits } = require('discord.js');

module.exports.run = (oldmember, client) => {
    oldmember.guild.members.fetchMe()
        .then(guildMe => {
            if (guildMe.permissions.has(PermissionFlagsBits.ChangeNickname)) {
                utils.setNickname(oldmember.guild, client);
            }
        });
};