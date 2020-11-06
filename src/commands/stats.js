/* eslint-disable no-undef */
module.exports.run = (msg, args, client) => {	
	msg.channel.send(client.embeds.stats())
		.catch((err) => client.logger.error('Stats', err));
};