const utils = require('../utils');
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
                .then(async reactions => {
                    if (reactions.size == 1) {
                        let filter
                        switch (reactions.first().emoji.name) {
                            case '👁':
                                // Removing all reactions
                                cMsg.clearReactions();
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
                                        .then(() => {
                                            cMsg.delete(30000);
                                            msg.delete(30000);
                                        })
                                        .catch((err) => console.error("[ ERROR ] ", err));
                                })
                                break;
                            case '✏':
                                cMsg.clearReactions();
                                cMsg.edit(client.embeds.config.enterFormat());
                                filter = m => m.author.id == msg.author.id;
                                msg.channel.awaitMessages(filter, { max: 1, time: 60000 })
                                    .then(msgs => {
                                        if (msgs.size == 1) {
                                            let fMsg = msgs.first();
                                            if ((fMsg.content.includes("%all%") || fMsg.content.includes("%online%")) && !fMsg.content.includes("\"")) {
                                                let cfgValue = fMsg.content;
                                                // Transform config value by keys type transformation function.
                                                cfgValue = stdConfigTypeTransforms["format"](cfgValue);
                                                // Create object and set key and value to it.
                                                let newCfg = {};
                                                newCfg["format"] = cfgValue;
                                                // Update guild config in database.
                                                client.db.setGuildConfig(msg.guild, newCfg).then(() => {
                                                    msg.channel.send(client.embeds.config.formatSet(cfgValue))
                                                        .then(success => {
                                                            msg.delete(30000);
                                                            fMsg.delete(30000);
                                                            cMsg.delete(30000);
                                                            success.delete(30000);
                                                        })
                                                        .catch((err) => console.error("[ ERROR ] ", err));
                                                    utils.setNickname(msg.guild, client);  
                                                }).catch((err) => msg.channel.send(client.embeds.generalError('Error writing config data to database:', err)));
                                            } else {
                                                msg.channel.send(client.embeds.config.incorrectFormat());
                                            }
                                        }
                                    })
                                break;
                            case '🤖':
                                await cMsg.clearReactions();
                                cMsg.edit(client.embeds.config.botCount());
                                await cMsg.react("✅");
                                await cMsg.react("❎");
                                filter = (reaction, user) => (reaction.emoji.name === '✅' || reaction.emoji.name === '❎') && user.id === msg.author.id;
                                cMsg.awaitReactions(filter, { time: 60000, max: 1 })
                                    .then(r => {
                                        if (r.size == 1) {
                                            if (r.first().emoji.name == '✅') {
                                                let cfgValue = args.slice(1).join(' ');
                                                // Transform config value by keys type transformation function.
                                                cfgValue = 1;
                                                // Create object and set key and value to it.
                                                let newCfg = {};
                                                newCfg["countBots"] = cfgValue;
                                                // Update guild config in database.
                                                client.db.setGuildConfig(msg.guild, newCfg).then(() => {
                                                    msg.channel.send(client.embeds.config.botCountSet("yes"))
                                                }).catch((err) => msg.channel.send(client.embeds.generalError('Error writing config data to database:', err)));
                                            } else {
                                                let cfgValue = args.slice(1).join(' ');
                                                // Transform config value by keys type transformation function.
                                                cfgValue = 0;
                                                // Create object and set key and value to it.
                                                let newCfg = {};
                                                newCfg["countBots"] = cfgValue;
                                                // Update guild config in database.
                                                client.db.setGuildConfig(msg.guild, newCfg).then(() => {
                                                    msg.channel.send(client.embeds.config.botCountSet("no"))
                                                        .then(success => {
                                                            msg.delete(30000);
                                                            cMsg.delete(30000);
                                                            success.delete(30000);
                                                        })
                                                        .catch((err) => console.error("[ ERROR ] ", err));
                                                }).catch((err) => msg.channel.send(client.embeds.generalError('Error writing config data to database:', err)));
                                            }
                                        }
                                    })
                                break;
                        }
                    }
                })
        });
}