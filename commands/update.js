const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const utils = require('../utils');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('update')
        .setDMPermission(false)
        .setDescription("Updates MemberCounter's nickname to the current membercount"),

    run(interaction, client) {
        interaction.guild.members.fetchMe()
            .then(clientMember => {
                const timeout = client.timeout.check('cmdupdate');
                if (timeout > 0) {
                    interaction.reply({ embeds: [client.embeds.update.cooldown(timeout)] })
                        .catch((err) => console.error("[ ERROR ] ", err));
                } else {
                    if (clientMember.permissions.has(PermissionFlagsBits.ChangeNickname)) {
                        utils.setNickname(interaction.guild, client, (nick) => {
                            interaction.reply({ embeds: [client.embeds.update.success(nick)] })
                                .catch((err) => console.error("[ ERROR ] ", err));
                        });
                    } else {
                        interaction.reply({ embeds: [client.embeds.update.missingPerms()] })
                            .catch((err) => console.error("[ ERROR ] ", err));
                    }
                }
            });
    }
}