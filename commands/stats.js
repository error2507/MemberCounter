module.exports.run = async (msg, args, client) => {
    let charset = ['e', 'r', 'o', '2', '5', '0', '7', 'm', 'b', 'c', 'u', 'n', 't'];
    let random = '';
    for (d = 0; d < 6; d++) {
        random += charset[Math.floor(Math.random() * charset.length)];
    }
    msg.channel.send(client.embeds.stats(random));
}