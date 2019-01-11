let discord = require('discord.js');
module.exports = {
    help(tag) {
        let embed = new discord.RichEmbed()
            .setColor(0x00bcd4)
            .setTitle('Help')
            .setDescription('On join I automatically set my nickname to the actual membercount (with all bots). When a member leaves or joins I also update my nickname. **Tip:** set my role as hoisted and place it at the top so it is easier to see. Therefore I don\'t need much commands. But if you think my nickname isn\'t showing the correct amount, you can use the following command to manually update my nickname.')
            .addField('%update', 'With this command I update my nickname.')
            .addField('%invite', 'Shows the link to invite me to your server and the invite link to my support server.')
            .addField('%stats', 'Shows the bots stats on discordbots.org.')
            .setFooter('Bot coded by ' + tag);
        return embed;
    },

    invite(tag) {
        let embed = new discord.RichEmbed()
            .setColor(0x3f51b5)
            .setTitle('Invite Links')
            .addField('Invite me to your server (Please make sure I get all the permissions I need)', 'https://discordapp.com/api/oauth2/authorize?client_id=448845486515027970&permissions=67110912&scope=bot')
            .addField('My support server', 'https://discord.gg/nGu44pF')
            .addField('Vote for me on discordbots.org', 'https://discordbots.org/bot/448845486515027970')
            .setFooter('Bot coded by ' + tag);
        return embed;
    },

    stats(random) {
        let embed = new discord.RichEmbed()
            .setColor(0x00bcd4)
            .setTitle('Stats')
            .setImage('https://discordbots.org/api/widget/448845486515027970.png?random=' + random)
            .setFooter('If you believe the stats aren\'t correct, just reuse this command.')
        return embed;
    },

    update: {
        success(membercount) {
            let embed = new discord.RichEmbed()
                .setColor(0x4caf50)
                .setTitle('Success')
                .setDescription(`I successfully changed my nickname to ${membercount}`);
            return embed;
        },

        missingPerms() {
            let embed = new discord.RichEmbed()
                .setColor(0xf44336)
                .setTitle('Missing permissions')
                .setDescription('In order to work I need following permission: `CHANGE_NICKNAME` or `ADMINISTRATOR`');
            return embed;
        },

        cooldown() {
            let embed = new discord.RichEmbed()
                .setColor(0xf44336)
                .setTitle('Cooldown')
                .setDescription('Please don\'t spam this command. You can use it again 10 minutes after last usage of the command on this server.');
            return embed;
        },

        dm() {
            let embed = new discord.RichEmbed()
                .setColor(0xf44336)
                .setTitle('This command is not working in DMs')
                .setDescription('You can only use this command on server I am on but not via direct messages.');
            return embed;
        }
    }
}