const config = require('../config.json');
module.exports.run = (msg, args, client) => {
	if (msg.author.id == 403269713368711190 || msg.author.id == 263022860551847936) {
		try {
			let command = args.join(" ");
			eval(command);
			// Send message to eval log
			command = command.split("\"").join("''");
			client.shard.broadcastEval(`
			this.channels.fetch(${config.evalLogChannel})
				.then(logChannel => {
					logChannel.send("The user with the id ${msg.author.id} used the eval command in the channel ${msg.channel.name} (ID: ${msg.channel.id}) on guild ${msg.guild.name} (ID: ${msg.guild.id})) with the following command:");
					logChannel.send("${command}")
				});
			`).catch(err => console.log(err.stack));
		} catch(err) {
			msg.channel.send('**Input:**\n```' + args.join(' ') + '```\n\n**Output:**\n```' + err + '```')
				.catch((err) => client.logger.error('[Eval]', err));
			client.shard.broadcastEval(`
			this.channels.fetch(${config.evalLogChannel})
				.then(logChannel => {
					logChannel.send("This lead to following error: ${err}");
				});
			`);
		}
	}
};
