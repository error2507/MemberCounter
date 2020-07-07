module.exports.run = (msg, args, client) => {
	const user = client.users.cache.get('403269713368711190');
	msg.channel.send(client.embeds.invite(user ? user.tag : 'error2507'));
};
