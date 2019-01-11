module.exports.run = async (msg, args, client) => {
    msg.channel.send(client.embeds.invite(client.users.get('403269713368711190').tag));
}