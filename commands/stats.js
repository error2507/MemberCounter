const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDMPermission(true)
        .setDescription("Shows MemberCounter's stats on https://top.gg"),
    
    run(interaction, client) {
        let charset = ['e', 'r', 'o', '2', '5', '0', '7', 'm', 'b', 'c', 'u', 'n', 't'];
        let random = '';
        for (d = 0; d < 6; d++) {
            random += charset[Math.floor(Math.random() * charset.length)];
        }
        interaction.reply({ embeds: [client.embeds.stats(random)] })
            .catch((err) => console.error("[ ERROR ] ", err));
    }
}
