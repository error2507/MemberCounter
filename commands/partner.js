const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('partner')
        .setDMPermission(true)
        .setDescription("Shows the partners that support the hosting of MemberCounter"),
    
    run(interaction, client) {
        interaction.reply({ embeds: [client.embeds.partner()] })
            .catch((err) => console.error("[ ERROR ] ", err));
    }
}
