
const { MessageEmbed } = require('discord.js');
module.exports = {
    help(tag, prefix) {
        let embed = new MessageEmbed()
            .setColor(0x00bcd4)
            .setTitle('Help')
            .setDescription('On join I automatically set my nickname to the actual membercount (with all bots). When a member leaves or joins I also update my nickname. **Tip:** set my role as hoisted and place it at the top so it is easier to see. Therefore I don\'t need much commands. But if you think my nickname isn\'t showing the correct amount, you can use the following command to manually update my nickname.')
            .addField(prefix + 'update', 'With this command I update my nickname.')
            .addField(prefix + 'invite', 'Shows the link to invite me to your server and the invite link to my support server.')
            .addField(prefix + 'stats', 'Shows my stats on discordbots.org.')
            .addField(prefix + 'config', 'Guild specific configuration. For more details, see [here](https://github.com/error2507/MemberCounter/blob/master/README.md).')
            .setFooter('Bot coded by ' + tag);
        return embed;
    },

    invite(tag) {
        let embed = new MessageEmbed()
            .setColor(0x3f51b5)
            .setTitle('Invite Links')
          //  .addField('Invite me to your server (Please make sure I get all the permissions I need)', 'https://discordapp.com/api/oauth2/authorize?client_id=448845486515027970&permissions=67110912&scope=bot')
            //.addField('My support server', 'https://discord.gg/nGu44pF')
          //  .addField('Vote for me on discordbots.org', 'https://discordbots.org/bot/448845486515027970')
            .addField('Open Source', 'I am OSS at [https://github.com/error2507/MemberCounter](https://github.com/error2507/MemberCounter)')
            .setFooter('Bot coded by ' + tag)
            .setDescription('[Invite Bot](https://discordapp.com/api/oauth2/authorize?client_id=448845486515027970&permissions=67110912&scope=bot) - [Support Server](https://discord.gg/nGu44pF) - [Vote](https://discordbots.org/bot/448845486515027970)')
            .setFooter(`MemberCounter#0402 coded by ${tag}`)
        return embed;
    },

    partner() {
        let embed = new MessageEmbed()
            .setColor(0x009FDF)
            .setTitle('Partner')
            .setImage('https://cdn.discordapp.com/attachments/468377584825139200/570312606640767016/Logo.png')
            .setDescription('MemberCounter is hosted on a VPS by RareLoot.at \nRareLoot offers WebHosting, Linux Container and vServer at an affordable price.\n:point_right: **Check it out at https://www.rareloot.at/en/start/ **');
        return embed;
    },

    stats(random) {
        let embed = new MessageEmbed()
            .setColor(0x00bcd4)
            .setTitle('Stats')
            .setImage('https://discordbots.org/api/widget/448845486515027970.png?random=' + random)
            .setFooter('If you believe the stats aren\'t correct, just reuse this command.')
        return embed;
    },

    generalError(desc, err) {
        return new MessageEmbed()
            .setColor(0x4caf50)
            .setTitle('Error ' + desc)
            .setDescription('```' + err + '```')
            .setFooter('If you keep getting this error, please join my support server and tell the team about this problem. Thanks!');
    },

    update: {
        success(membercount) {
            let embed = new MessageEmbed()
                .setColor(0x4caf50)
                //.setTitle('Success')
                .setDescription(`✅ I successfully changed my nickname to \`${membercount}\`.`);
            return embed;
        },

        missingPerms() {
            let embed = new MessageEmbed()
                .setColor(0xf44336)
                .setTitle('Missing permissions')
                .setDescription('In order to work I need following permission: \`CHANGE_NICKNAME\` or \`ADMINISTRATOR\`');
            return embed;
        },

        cooldown(time) {
            let embed = new MessageEmbed()
                .setColor(0xf44336)
                .setTitle('Cooldown')
                .setDescription(`Please don\'t spam this command. You can use it again in ${Math.floor(time / 1000)} seconds.`);
            return embed;
        },

        dm() {
            let embed = new MessageEmbed()
                .setColor(0xf44336)
                .setDescription('This command is unavailable via private message. Please run this command within a server.');
            return embed;
        }
    },

    config: {
        list(configData) {
            let embed =  new MessageEmbed()
                .setColor(0x00bcd4)
                .setTitle('Current guild configuration');
            Object.keys(configData).forEach(k => {
                switch (k) {
                    case "format":
                        embed.addField("Format", configData[k]);
                        break;
                    case "countBots":
                        embed.addField("Are bots counted?", (configData[k] == 0 ? "No" : "Yes"));
                        break;
                }

            });
            return embed;
        },

        formatSet(value) {
            return new MessageEmbed()
                .setColor(0x4caf50)
                .setTitle('Format set')
                .setDescription(`Format set to \`${value}\`.`);
        },

        chooseOption() {
            return new MessageEmbed()
                .setColor(0x00bcd4)
                .setTitle("Config Menu")
                .setDescription("What do you want to do? React below with the given emoji!")
                .addField("👁 See the current configuration", "You can see the current config on this server.")
                .addField("✏ Edit the format of the nickname", "You can edit how the bot displays the members.")
                .addField("🤖 Decide whether bots should be counted", "You can decide whether bots should be counted or just members.");
        },

        enterFormat() {
            return new MessageEmbed()
                .setColor(0x00bcd4)
                .setTitle("Enter your desired format")
                .setDescription("Enter you desrired format. Use `%all%` as a placeholder for all (online and offline) members.\n**Note:** You can _not_ use `\"` in your format! Also you _have to_ use at least one placeholder.");
        },

        incorrectFormat() {
            return new MessageEmbed()
                .setColor(0xf44336)
                .setTitle("Your format is incorrect")
                .addField("First option:", "You forgot to add a placeholder. (Placeholders: `%all%`)")
                .addField("Second option:", "You used a `\"` which is not allowed.");
        },

        botCount() {
            return new MessageEmbed()
                .setColor(0x00bcd4)
                .setTitle("Should bots be counted?")
                .setDescription("Should bots (including this one) be counted in %all%?\n✅: Yes, they should be counted.\n❎:No, they shouldn't be counted.");
        },

        botCountSet(value) {
            return new MessageEmbed()
                .setColor(0x4caf50)
                .setTitle('Format set')
                .setDescription(`Botcount set to \`${value}\`.`);
        },

        noAdmin() {
            return new MessageEmbed()
                .setColor(0xf44336)
                .setTitle("Admin needed!")
                .setDescription("You need admin permissions to use this command.")
        },

        noAddReactionPerms() {
            return new MessageEmbed()
                .setColor(0x4caf50)
                .setTitle("I don't have the permission to add reactions to messages!")
                .setDescription("I can't add reactions to messages, please make sure that I have this permission in order to change my config.");
        }
    },
};
