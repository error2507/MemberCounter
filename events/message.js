module.exports = (client, msg) => {
    if (msg.content.startsWith(client.config.prefix) && !msg.author.bot) {
        if (client.commands.has(msg.content.split(' ')[0].substr(config.prefix.length))) {
            let args = msg.content.split(' ').slice(1);
            client.commands.get(msg.content.split(' ')[0].substr(config.prefix.length)).run(msg, args, client);
        }
    }
}