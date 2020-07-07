module.exports.run = (msg, client) => {
	const prefix = client.config.prefix;
	if (msg.content.startsWith(prefix) && !msg.author.bot) {
		if (client.commands.has(msg.content.split(' ')[0].substr(prefix.length).toLowerCase())) {
			const args = msg.content.split(' ').slice(1);
			client.commands.get(msg.content.split(' ')[0].substr(prefix.length).toLowerCase()).run(msg, args, client);
		}
	}
};