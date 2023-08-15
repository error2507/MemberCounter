const utils = require('../utils');
const embeds = require('../embeds');
const { PermissionFlagsBits } = require('discord.js');

const stdConfig = {
    "format": "%all%",
    "countBots": 1,
};

module.exports.run = (newguild, client) => {
    client.db.getGuildConfig(newguild)
    .then(_guildConfig => {
        let guildConfig = _guildConfig;

        if (Object.keys(guildConfig).length == 0) {
            guildConfig = stdConfig;
            client.db.setGuildConfig(newguild, stdConfig)
                .catch((err) => {
                    console.error("[ ERROR ] While creating config after joining " + newguild.id + "\n", err)
                });
        }
    });
    
    newguild.members.fetchMe()
        .then(guildMe => {
            // initial check if bot has permission to set nickname, if not try to send message to owner
            if (guildMe.permissions.has(PermissionFlagsBits.ChangeNickname)) {
                utils.setNickname(newguild, client);
            } else {
                client.users.fetch(newguild.ownerId)
                    .then(ownerUser => {
                        ownerUser.send({ embeds: [embeds.update.messageToOwner(newguild.name)] })
                            .catch((err) => console.error("[ ERROR ] ", err))
                    })
                    .catch((err) => console.error("[ ERROR ] ", err));
            }
        });
}