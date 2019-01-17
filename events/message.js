module.exports.run = (msg, client) => {
    let prefix = (client.config.debug.enabled == true ? client.config.debug.prefix : client.config.prefix);
    if (msg.content.startsWith(prefix) && !msg.author.bot) {
        if (client.commands.has(msg.content.split(' ')[0].substr(prefix.length).toLowerCase())) {
            let args = msg.content.split(' ').slice(1);
            client.commands.get(msg.content.split(' ')[0].substr(prefix.length).toLowerCase()).run(msg, args, client);
        }
    }
}