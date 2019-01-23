const stdConfig = {
    'format':    '%all%',
    'countBots': 1,
};
const stdConfigTypeTransforms = {
    'format': (v) => v,
    'countBots': (v) => v.toLowerCase() == 'true' || v == '1' ? 1 : 0,
};

module.exports.run = (msg, args, client) => {
    client.db.getGuildConfig(msg.guild).then((guildConfig) => {
        Object.keys(stdConfig).forEach((k) => {
            if (guildConfig[k] == null)
                guildConfig[k] = stdConfig[k];
        });

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
        cfgValue = stdConfigTypeTransforms[cfgKey](cfgValue);
        let newCfg = {};
        newCfg[cfgKey] = cfgValue;
        client.db.setGuildConfig(msg.guild, newCfg).then(() => {
            msg.channel.send(client.embeds.config.valueSet(cfgKey, cfgValue))
                .catch((err) => console.error("[ ERROR ] ", err));
        }).catch((err) => msg.channel.send(client.embeds.generalError('Error writing config data to database:', err)));
    }).catch((err) => msg.channel.send(client.embeds.generalError('Error getting config data to database:', err)));
    
};