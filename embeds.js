const { EmbedBuilder } = require('discord.js');
module.exports = {
    help() {
        return new EmbedBuilder()
            .setColor(0x00bcd4)
            .setTitle('Help')
            .setDescription('On join I automatically set my nickname to the actual membercount (with all bots). When a member leaves or joins I also update my nickname. **Tip:** set my role as hoisted and place it at the top so it is easier to see. Therefore I don\'t need much commands. But if you think my nickname isn\'t showing the correct amount, you can use the following command to manually update my nickname.')
            .addFields(
                { name: '/update', value: 'With this command I update my nickname.' },
                { name: '/invite', value: 'Shows the link to invite me to your server and the invite link to my support server.'},
                { name: '/stats', value: 'Shows my stats on discordbots.org.' },
                { name: '/config', value: 'Guild specific configuration. For more details, see [here](https://github.com/error2507/MemberCounter/blob/master/README.md).'}
            )
    },

    invite() {
        return new EmbedBuilder()
            .setColor(0x3f51b5)
            .setTitle('Invite Links')
            .addFields(
                { name: 'Invite me to your server (Please make sure I get all the permissions I need)', value: 'https://discordapp.com/api/oauth2/authorize?client_id=448845486515027970&permissions=67110912&scope=bot' },
                { name: 'My support server', value: 'https://discord.gg/nGu44pF' },
                { name: 'Vote for me on top.gg', value: 'https://top.gg/bot/448845486515027970' },
                { name: 'My GitHub Repo', value: 'https://github.com/error2507/MemberCounter' }
            )
    },

    stats(random) {
        return new EmbedBuilder()
            .setColor(0x00bcd4)
            .setTitle('Stats')
            .setImage('https://top.gg/api/widget/448845486515027970.png?random=' + random)
            .setFooter({ text: 'If you believe the stats aren\'t correct, just reuse this command.' })
    },

    generalError(desc, err) {
        return new EmbedBuilder()
            .setColor(0x4caf50)
            .setTitle('Error ' + desc)
            .setDescription('```' + err + '```')
            .setFooter('If you keep getting this error, please join my support server and tell the team about this problem. Thanks!');
    },

    update: {
        success(membercount) {
            return new EmbedBuilder()
                .setColor(0x4caf50)
                .setTitle('Success')
                .setDescription(`I successfully changed my nickname to \`${membercount}\``);
        },

        missingPerms() {
            return new EmbedBuilder()
                .setColor(0xf44336)
                .setTitle('Missing permissions')
                .setDescription('In order to work I need the permission to change my nickname.');
        },

        messageToOwner(guildName) {
            return new EmbedBuilder()
                .setColor(0x00bcd4)
                .setTitle('Missing permissions')
                .setDescription("Hey! :wave:\nSomeone added this bot to " + guildName + ". This bot shows the current membercount of the server as its nickname. But to do so it needs to have the permission to change its nickname. Please give that permission to the bot.")
        },

        cooldown(time) {
            return new EmbedBuilder()
                .setColor(0xf44336)
                .setTitle('Cooldown')
                .setDescription(`Please don\'t spam this command. You can use it again in ${Math.floor(time / 1000)} seconds.`);
        }
    },

    config: {
        list(configData) {
            const embed = new EmbedBuilder()
                .setColor(0x00bcd4)
                .setTitle("Current guild's config");
            Object.keys(configData).forEach(k => {
                switch (k) {
                    case "format":
                        embed.addFields({ name: "Format", value: configData[k] });
                        break;
                    case "countBots":
                        embed.addFields({ name: "Are bots counted?", value: (configData[k] == 0 ? "No" : "Yes")});
                        break;
                }

            });
            return embed;
        },

        formatSet(value) {
            return new EmbedBuilder()
                .setColor(0x4caf50)
                .setTitle('Format set')
                .setDescription(`Format set to \`${value}\`.`);
        },

        incorrectFormat() {
            return new EmbedBuilder()
                .setColor(0xf44336)
                .setTitle("Your format is incorrect")
                .addFields(
                    { name: "First option:", value: "You forgot to add a placeholder. (Placeholders: `%all%`)" },
                    { name: "Second option:", value: "You used a `\"` which is not allowed."}
                )
        },

        formatTooLong() {
            return new EmbedBuilder()
                .setColor(0xf44336)
                .setTitle("Your format is too long")
                .setDescription("Your format is longer than the allowed 23 characters.")
        }
    },
};