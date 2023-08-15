const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDMPermission(true)
        .setDescription("Shows a list of links relateed to MemberCounter"),

    run(interaction, client) {
        
        interaction.reply({ embeds: [client.embeds.invite()] })
            .catch((err) => console.error("[ ERROR ] ", err));
    }
}
