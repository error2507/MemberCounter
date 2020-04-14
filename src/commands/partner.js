module.exports.run = (msg, args, client) => {
    msg.channel.send(client.embeds.partner());
};