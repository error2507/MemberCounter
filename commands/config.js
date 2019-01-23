// Standard config values
const stdConfig = {
    'format':    '%all%',
    'countBots': 1,
};

// Methdos how to parse the string type parameter from
// the command to the config value type
const stdConfigTypeTransforms = {
    // format -> type string -> stirng remains string
    'format': (v) => v,
    // countBots -> type tinyint -> if v == 'true' or '1' result will be 1, else 0
    'countBots': (v) => v.toLowerCase() == 'true' || v == '1' ? 1 : 0,
};

module.exports.run = (msg, args, client) => {
    // Getting current guilds config from database.
    client.db.getGuildConfig(msg.guild).then((guildConfig) => {
        // Check which keys are set in the config. If a key's value
        // is 'null', it will be replaced with the standard value
        // defined above.
        Object.keys(stdConfig).forEach((k) => {
            if (guildConfig[k] == null)
                guildConfig[k] = stdConfig[k];
        });
        // If guild has no config set, the default config
        // will be used as guild config.
        if (!guildConfig)
            guildConfig = stdConfig;

        // Display current guilds config as JSON object if
        // no command arguments are set.
        if (args.length < 1) {
            msg.channel.send(client.embeds.config.list(guildConfig))
                .catch((err) => console.error("[ ERROR ] ", err));
            return;
        }
        
        // Else, check if config key set in first command argument
        // matches with any config key. This will be matched non-case-sensitive.
        let cfgKey = Object.keys(stdConfig)
            .find((k) => k.toLowerCase() == args[0].toLowerCase());
        // If no matching key was found, send wrong key error embed.
        if (!cfgKey) {
            msg.channel.send(client.embeds.config.errWrongKey(args[0]))
                .catch((err) => console.error("[ ERROR ] ", err));
            return;
        }
        // If no value is passed as command argument after the config key,
        // the current set key-value-pair will be displayed in JSON format.
        if (args.length < 2) {
            msg.channel.send(client.embeds.config.currValue(guildConfig, args[0]));
            return;
        }

        // All values after the first command argument will be interpreted as
        // config value to set for specified config key.
        let cfgValue = args.slice(1).join(' ');
        // Transform config value by keys type transformation function.
        cfgValue = stdConfigTypeTransforms[cfgKey](cfgValue);
        // Create object and set key and value to it.
        let newCfg = {};
        newCfg[cfgKey] = cfgValue;
        // Update guild config in database.
        client.db.setGuildConfig(msg.guild, newCfg).then(() => {
            msg.channel.send(client.embeds.config.valueSet(cfgKey, cfgValue))
                .catch((err) => console.error("[ ERROR ] ", err));
        }).catch((err) => msg.channel.send(client.embeds.generalError('Error writing config data to database:', err)));
    }).catch((err) => msg.channel.send(client.embeds.generalError('Error getting config data to database:', err)));
    
};