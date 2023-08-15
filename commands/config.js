const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const utils = require('../utils.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('config')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .setDescription("Configure MemberCounter's displaying options")
        .addBooleanOption(option => 
            option
                .setName('count_bots')
                .setDescription("Define wheter bots should be included while counting")
        )
        .addStringOption(option => 
            option
                .setName('nickname_format')
                .setDescription("The format that the bot uses in its nickname. The keyword %all% will be replaced by the membercount.")
        ),
    
    async run(interaction, client) {
        const newNicknameFormat = interaction.options.getString('nickname_format');
        const newCountBots = interaction.options.getBoolean('count_bots');

        // check if format (if it is provided) is in the correct format
        if (newNicknameFormat !== null && (!newNicknameFormat.includes("%all%") || newNicknameFormat.includes('"'))) {
            return interaction.reply({ embeds: [client.embeds.config.incorrectFormat()] })
                .catch((err) => console.error("[ ERROR ] ", err));
        }

        // check if nickname is not too long
        if (newNicknameFormat !== null && newNicknameFormat.replace("%all%", "").length > 23) {
            return interaction.reply({ embeds: [client.embeds.config.formatTooLong()] })
                .catch((err) => console.error("[ ERROR ] ", err));
        }

        const interactionGuild = interaction.member.guild;
        let currentGuildConfig = await client.db.getGuildConfig(interactionGuild);

        // show current config if no options are defined by the command issuer
        if (newNicknameFormat === null && newCountBots === null) {
            return interaction.reply({ embeds: [client.embeds.config.list(currentGuildConfig)] })
                .catch((err) => console.error("[ ERROR ] ", err))
        }

        // continue to editing if everything seems alright
        // set standard config if config is not set yet
        if (Object.keys(currentGuildConfig).length === 0) {
            const standardConfig = {
                "format": "%all%",
                "countBots": 1
            };
            client.db.setGuildConfig(interactionGuild, standardConfig);
            currentGuildConfig = standardConfig;
        }

        const newGuildConfig = {};
        newGuildConfig.format = (newNicknameFormat !== null ? newNicknameFormat : currentGuildConfig.format);
        newGuildConfig.countBots = (newCountBots !== null ? (newCountBots ? 1 : 0) : currentGuildConfig.countBots);

        client.db.setGuildConfig(interactionGuild, newGuildConfig);
        utils.setNickname(interactionGuild, client);

        interaction.reply({ embeds: [client.embeds.config.list(newGuildConfig)] })
            .catch((err) => console.error("[ ERROR ] ", err));
    }
}
