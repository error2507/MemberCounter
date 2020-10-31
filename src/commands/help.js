module.exports.run = (msg, args, client) => {
	const prefix = client.config.prefix;
	msg.channel.send(client.embeds.help(prefix, client.user.displayAvatarURL()));
};
