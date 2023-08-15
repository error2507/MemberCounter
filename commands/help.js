const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDMPermission(true)
        .setDescription("Shows a list of all available commands for MemberCounter"),

    run(interaction, client) {
        
        interaction.reply({ embeds: [client.embeds.help()] })
            .catch((err) => console.error("[ ERROR ] ", err));
    }
}
