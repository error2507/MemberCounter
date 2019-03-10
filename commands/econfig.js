const stdConfig = {
    'format':    '%all%',
    'countBots': 1,
};

const stdConfigTypeTransforms = {
    // format -> type string -> stirng remains string
    'format': (v) => v,
    // countBots -> type tinyint -> if v == 'true' or '1' result will be 1, else 0
    'countBots': (v) => v.toLowerCase() == 'true' || v == '1' ? 1 : 0,
};
module.exports.run = async (msg, args, client) => {
    msg.channel.send(client.embeds.config.chooseOption())
        .then(async cMsg => {
            await cMsg.react("👁");
            await cMsg.react("✏");
            await cMsg.react("🤖");
            let filter = (reaction, user) => (reaction.emoji.name === '👁' || reaction.emoji.name === '✏' || reaction.emoji.name === '🤖') && user.id === msg.author.id;
            cMsg.awaitReactions(filter, { time: 60000, max: 1 })
                .then(reactions => {
                    if (reactions.size == 1) {
                        switch (reactions.first().emoji.name) {
                            case '👁':
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
                                    // Edit cMsg (which was the menu before) to display current guild config
                                    cMsg.edit(client.embeds.config.list(guildConfig))
                                        .catch((err) => console.error("[ ERROR ] ", err));
                                })
                                break;
                            case '✏':
                                break;
                            case '🤖':
                                break;
                        }
                    }
                })
        });
}