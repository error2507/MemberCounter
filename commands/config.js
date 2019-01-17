const stdConfig = {
    'format':    '%all%',
    'countBots': true,
};

module.exports.run = (msg, args, client) => {
    let guildConfig = client.db.get(`guilds.${msg.guild.id}.config`).value();
    if (!guildConfig)
        guildConfig = stdConfig;
    if (args.length < 1) {
        msg.channel.send(client.embeds.config.list(guildConfig))
            .catch((err) => console.error("[ ERROR ] ", err));
        return;
    }
    let cfgKey = Object.keys(stdConfig)
        .find((k) => k.toLowerCase() == args[0].toLowerCase());
    if (!cfgKey) {
        msg.channel.send(client.embeds.config.errWrongKey(args[0]))
            .catch((err) => console.error("[ ERROR ] ", err));
        return;
    }
    if (args.length < 2) {
        msg.channel.send(client.embeds.config.currValue(guildConfig, args[0]));
        return;
    }
    let cfgValue = args.slice(1).join(' ');
    client.db.set(`guilds.${msg.guild.id}.config.${cfgKey}`, cfgValue).write();
    msg.channel.send(client.embeds.config.valueSet(cfgKey, cfgValue))
        .catch((err) => console.error("[ ERROR ] ", err));
};