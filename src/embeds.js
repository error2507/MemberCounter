/* eslint-disable no-useless-escape */
const { MessageEmbed } = require('discord.js');
module.exports = {
	help(tag, prefix) {
		const embed = new MessageEmbed()
			.setColor(0x00bcd4)
			.setTitle('Help')
			.setDescription('On join I automatically set my nickname to the actual membercount (with all bots). When a member leaves or joins I also update my nickname. **Tip:** set my role as hoisted and place it at the top so it is easier to see. Therefore I don\'t need much commands. But if you think my nickname isn\'t showing the correct amount, you can use the following command to manually update my nickname.')
			.addField(prefix + 'update', 'With this command I update my nickname.')
			.addField(prefix + 'invite', 'Shows the link to invite me to your server and the invite link to my support server.')
			.addField(prefix + 'stats', 'Shows my stats on discordbots.org.')
			.addField(prefix + 'config', 'Guild specific configuration. For more details, see [here](https://github.com/error2507/MemberCounter/blob/master/README.md).')
			.setTimestamp()
			.setFooter('MemberCounter#0402');
		return embed;
	},

	invite(tag) {
		const embed = new MessageEmbed()
			.setColor(0x3f51b5)
			.setTitle('Invite Links')
			.addField('Open Source', 'I am OSS at [https://github.com/error2507/MemberCounter](https://github.com/error2507/MemberCounter)')
			.setDescription('[Invite Bot](https://discordapp.com/api/oauth2/authorize?client_id=448845486515027970&permissions=67110912&scope=bot) - [Support Server](https://discord.gg/nGu44pF) - [Vote](https://discordbots.org/bot/448845486515027970)')
			.setTimestamp()
			.setFooter('MemberCounter#0402');
		return embed;
	},

	partner() {
		const embed = new MessageEmbed()
		// .setColor(0x009FDF)
			.setColor('#2980B9')
			.setTitle('Partner')
			.setImage('https://cdn.discordapp.com/attachments/468377584825139200/570312606640767016/Logo.png')
			.setDescription('MemberCounter is hosted on a VPS by RareLoot.at .\nRareLoot offers WebHosting, Linux Container and vServer at an affordable price.\n:point_right: **Check it out at https://www.rareloot.at/en/start/ **')
			.setTimestamp()
			.setFooter('MemberCounter#0402');
		return embed;
	},

	stats(random) {
		const embed = new MessageEmbed()
		// .setColor(0x00bcd4)
			.setTitle('Stats')
			.setDescription('**Tip:** Support me by voting on [top.gg](https://top.gg/bot/448845486515027970).')
			.setImage('https://discordbots.org/api/widget/448845486515027970.png?random=' + random)
			.setColor('#2980B9')
			.setTimestamp()
			.setFooter('MemberCounter#0402');
		return embed;
	},

	generalError(desc, err) {
		return new MessageEmbed()
		// .setColor(0x4caf50)
			.setColor('RED')
			.setTitle('Error ' + desc)
			.setDescription('```' + err + '```')
			.setFooter('If this error persists, please join my support server and report this problem. Thanks!')
			.setTimestamp()
			.setFooter('MemberCounter#0402');
	},

	update: {
		success(membercount) {
			const embed = new MessageEmbed()
				.setColor(0x4caf50)
			// .setTitle('Success')
				.setDescription(`✅ I successfully changed my nickname to \`${membercount}\`.`)
				.setTimestamp()
				.setFooter('MemberCounter#0402');
			return embed;
		},

		missingPerms() {
			const embed = new MessageEmbed()
			// .setColor(0xf44336)
				.setColor('RED')
				.setTitle(':x: Missing permissions')
				.setDescription('In order to work I need following permission: \`CHANGE_NICKNAME\` or \`ADMINISTRATOR\`')
				.setTimestamp()
				.setFooter('MemberCounter#0402');
			return embed;
		},

		cooldown(time) {
			const embed = new MessageEmbed()
			// .setColor(0xf44336)
				.setColor('RED')
				.setTitle(':x: Cooldown')
				.setDescription(`Please wait for \`${Math.floor(time / 1000)}\` more second(s) before reusing the command.`)
				.setTimestamp()
				.setFooter('MemberCounter#0402');
			return embed;
		},

		dm() {
			const embed = new MessageEmbed()
			// .setColor(0xf44336)
				.setColor('RED')
				.setDescription(':x: This command is unavailable via private message. Please run this command within a server.')
				.setTimestamp()
				.setFooter('MemberCounter#0402');
			return embed;
		},
	},

	config: {
		list(configData) {
			const embed = new MessageEmbed()
			// .setColor(0x00bcd4)
				.setColor('#2980B9')
				.setTitle('Current guild configuration')
				.setTimestamp()
				.setFooter('MemberCounter#0402');
			Object.keys(configData).forEach(k => {
				switch (k) {
				case 'format':
					embed.addField(':white_small_square: Format', `\`${configData[k]}\``);
					break;
				case 'countBots':
					embed.addField(':white_small_square: Are bots counted?', `\`${(configData[k] == 0 ? 'No' : 'Yes')}\``);
					break;
				}

			});
			return embed;
		},

		formatSet(value) {
			return new MessageEmbed()
				.setColor(0x4caf50)
				.setTitle('Format set')
				.setDescription(`✅ Format set to \`${value}\`.`)
				.setTimestamp()
				.setFooter('MemberCounter#0402');
		},

		chooseOption() {
			return new MessageEmbed()
			// .setColor(0x00bcd4)
				.setColor('#2980B9')
				.setTitle('Guild Configuration')
				.setDescription('What do you want to do? React below with the given emoji!')
				.addField('👁 See the current configuration', 'You can see the current config on this server.')
				.addField('✏ Edit the format of the nickname', 'You can edit how the bot displays the members.')
				.addField('🤖 Decide whether bots should be counted', 'You can decide whether bots should be counted or just members.')
				.setTimestamp()
				.setFooter('MemberCounter#0402');
		},

		enterFormat(memberCount) {
			return new MessageEmbed()
			// .setColor(0x00bcd4)
				.setColor('#2980B9')
				.setTitle('Modify Configuration')
				.setDescription(`Enter your desired format. Avaible placeholders : \`%all%\`, \`%online%\`, \`%offline%\` (For all/online/offline members)\n\n**Note:** You can _not_ use \" in your format! In addition you have to use at least one placeholder.\n\n**Example:** %all% Members -> __${memberCount} Members__ as my nickname`)
				.setTimestamp()
				.setFooter('MemberCounter#0402');
		},

		incorrectFormat() {
			return new MessageEmbed()
			// .setColor(0xf44336)
				.setColor('RED')
				.setTitle(':x: Your format is incorrect')
				.addField('First option:', 'You forgot to add a placeholder. (Placeholders: `%all%`)')
				.addField('Second option:', 'You used a `"` which is not allowed.')
				.setTimestamp()
				.setFooter('MemberCounter#0402');
		},

		botCount() {
			return new MessageEmbed()
			// .setColor(0x00bcd4)
				.setColor('#2980B9')
				.setTitle('Should bots be counted?')
				.setDescription('Should bots (including this one) be counted in %all%?\n✅ **-** Yes, they should be counted.\n❎ **-**No, they shouldn\'t be counted.')
				.setTimestamp()
				.setFooter('MemberCounter#0402');
		},

		botCountSet(value) {
			return new MessageEmbed()
				.setColor(0x4caf50)
			// .setTitle('Format set')
				.setDescription(`✅ Botcount set to \`${value}\`.`)
				.setTimestamp()
				.setFooter('MemberCounter#0402');
		},

		noAdmin() {
			return new MessageEmbed()
			// .setColor(0xf44336)
				.setColor('RED')
				.setTitle('Missing Permissions')
				.setDescription(':x: You need admin permissions to use this command.')
				.setTimestamp()
				.setFooter('MemberCounter#0402');
		},

		noAddReactionPerms() {
			return new MessageEmbed()
			// .setColor(0x4caf50)
				.setColor('RED')
				.setTitle('Missing Permissions')
				.setDescription(':x: I can\'t add reactions to the messages or don\'t have the manage messages permission, please make sure that I have this permission in order to change my configuration.')
				.setTimestamp()
				.setFooter('MemberCounter#0402');
		},
	},
};
