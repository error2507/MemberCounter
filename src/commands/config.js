const utils = require('../utils');
const stdConfig = {
	'format': '%all%',
	'countBots': 1,
};

module.exports.run = async (msg, args, client) => {
	if(msg.channel.type == 'dm') return msg.channel.send(client.embeds.update.dm());
	// let guildMe = await msg.guild.users.fetch(client.user);

	if(!msg.guild.me.hasPermission('ADD_REACTIONS')) return msg.channel.send(client.embeds.config.noAddReactionPerms());
	let cMsg;
	return msg.channel.send(client.embeds.config.chooseOption())
		.then(msg => {
			cMsg = msg;
			return cMsg.react('👁');
		})
		.then(() => cMsg.react('✏'))
		.then(() => cMsg.react('🤖'))
		.then(() => cMsg.awaitReactions((reaction, user) => (reaction.emoji.name === '👁' || reaction.emoji.name === '✏' || reaction.emoji.name === '🤖') && user.id === msg.author.id, {
			time: 60000,
			max: 1,
		}))
		.then(reactions => {
			if(reactions.size !== 1) return undefined;
			switch (reactions.first().emoji.name) {
			case '👁':
				// Removing all reactions
				return cMsg.reactions.removeAll()
				// Getting current guilds config from database.
					.then(() => client.db.getGuildConfig(msg.guild))
					.then(_guildConfig => {
						let guildConfig = _guildConfig;

						if (Object.keys(guildConfig).length == 0) {
							guildConfig = stdConfig;
							client.db.setGuildConfig(msg.guild, stdConfig);
						}
						// Edit cMsg (which was the menu before) to display current guild config
						return cMsg.edit(client.embeds.config.list(guildConfig))
							.then(() => {
								cMsg.delete({ timeout: 30000, reason: 'Time is up.' });
								return msg.delete({ timeout: 30000, reason: 'Time is up.' });
							});
					});

			case '✏':
				if(!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send(client.embeds.config.noAdmin());
				cMsg.reactions.removeAll();
				const memberCount = msg.guild.memberCount;
				cMsg.edit(client.embeds.config.enterFormat(memberCount));
				return msg.channel.awaitMessages(m => m.author.id == msg.author.id, {
					max: 1,
					time: 60000,
				})
					.then(msgs => {
						if(msgs.size !== 1) return undefined;
						const fMsg = msgs.first();
						if((fMsg.content.includes('%all%') || fMsg.content.includes('%online%')) && !fMsg.content.includes('"')) {
							const cfgValue = fMsg.content;
							// Update guild config in database.
							return client.db.setGuildConfig(msg.guild, { format: cfgValue })
								.then(() => {
									msg.channel.send(client.embeds.config.formatSet(cfgValue))
										.then(success => {
											msg.delete({ timeout: 30000, reason: 'Time is up.' });
											fMsg.delete({ timeout: 30000, reason: 'Time is up.' });
											cMsg.delete({ timeout: 30000, reason: 'Time is up.' });
											return success.delete({ timeout: 30000, reason: 'Time is up.' });
										});
									utils.setNickname(msg.guild, client);
								})
								.catch((err) => msg.channel.send(client.embeds.generalError('Error writing config data to database:', err)));
						}
						return msg.channel.send(client.embeds.config.incorrectFormat());
					});

			case '🤖':
				if(!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send(client.embeds.config.noAdmin());
				return cMsg.edit(client.embeds.config.botCount())
					.then(() => {
						if(msg.guild.me.hasPermission('MANAGE_MESSAGES')) return cMsg.reactions.removeAll();
						return undefined;
					})
					.then(() => cMsg.react('✅'))
					.then(() => cMsg.react('❎'))
					.then(() => cMsg.awaitReactions((reaction, user) => (reaction.emoji.name === '✅' || reaction.emoji.name === '❎') && user.id === msg.author.id, {
						time: 60000,
						max: 1,
					}))
					.then(r => {
						if(r.size !== 1) return undefined;
						if(r.first().emoji.name == '✅') {
							cfgValue = 1;
							// Update guild config in database.
							return client.db.setGuildConfig(msg.guild, { countBots: cfgValue })
								.then(() => {
									msg.channel.send(client.embeds.config.botCountSet('yes'))
										.then((success) => {
											utils.setNickname(msg.guild, client);
											msg.delete({ timeout: 30000, reason: 'Time is up.' });
											cMsg.delete({ timeout: 30000, reason: 'Time is up.' });
											return success.delete({ timeout: 30000, reason: 'Time is up.' });
										});
								})
								.catch((err) => msg.channel.send(client.embeds.generalError('Error writing config data to database:', err)));
						}
						else {
							cfgValue = 0;
							// Update guild config in database.
							return client.db.setGuildConfig(msg.guild, { countBots: cfgValue })
								.then(() => {
									msg.channel.send(client.embeds.config.botCountSet('no'))
										.then((success) => {
											utils.setNickname(msg.guild, client);
											msg.delete({ timeout: 30000, reason: 'Time is up.' });
											cMsg.delete({ timeout: 30000, reason: 'Time is up.' });
											return success.delete({ timeout: 30000, reason: 'Time is up.' });
										});
								})
								.catch((err) => msg.channel.send(client.embeds.generalError('Error writing config data to database:', err)));
						}
					});

			default:
				return undefined;
			}
		})
		.then(() => {
			// FINISHED
		})
		.catch(console.error);
};
