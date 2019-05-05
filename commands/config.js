const utils = require("../utils");
const stdConfig = {
    "format": "%all%",
    "countBots": 1,
};

module.exports.run = (msg, args, client) => {
    if(msg.channel.type == "dm") return msg.channel.send(client.embeds.update.dm());
    let cMsg;
    return msg.channel.send(client.embeds.config.chooseOption())
    .then(msg => {
        cMsg = msg;
        return cMsg.react("👁");
    })
    .then(() => cMsg.react("✏"))
    .then(() => cMsg.react("🤖"))
    .then(() => cMsg.awaitReactions((reaction, user) => (reaction.emoji.name === "👁" || reaction.emoji.name === "✏" || reaction.emoji.name === "🤖") && user.id === msg.author.id, {
        time: 60000,
        max: 1
    }))
    .then(reactions => {
        if(reactions.size !== 1) return undefined;
        switch (reactions.first().emoji.name) {
            case "👁":
                // Removing all reactions
                return cMsg.clearReactions()
                // Getting current guilds config from database.
                .then(() => client.db.getGuildConfig(msg.guild))
                .then(_guildConfig => {
                    let guildConfig = _guildConfig;
                    // Check which keys are set in the config. If a key's value
                    // is 'null', it will be replaced with the standard value
                    // defined above.
                    Object.keys(stdConfig)
                    .forEach((k) => {
                        if(guildConfig[k] === null) guildConfig[k] = stdConfig[k];
                    });
                    // If guild has no config set, the default config
                    // will be used as guild config.
                    if(!guildConfig) guildConfig = stdConfig;
                    // Edit cMsg (which was the menu before) to display current guild config
                    return cMsg.edit(client.embeds.config.list(guildConfig))
                    .then(() => {
                        cMsg.delete(30000);
                        return msg.delete(30000);
                    });
                });

            case "✏":
                if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send(client.embeds.config.noAdmin());
                cMsg.clearReactions();
                cMsg.edit(client.embeds.config.enterFormat());
                return msg.channel.awaitMessages(m => m.author.id == msg.author.id, {
                    max: 1,
                    time: 60000
                })
                .then(msgs => {
                    if(msgs.size !== 1) return undefined;
                    const fMsg = msgs.first();
                    if((fMsg.content.includes("%all%") || fMsg.content.includes("%online%")) && !fMsg.content.includes("\"")) {
                        const cfgValue = fMsg.content;
                        // Update guild config in database.
                        return client.db.setGuildConfig(msg.guild, { format: cfgValue })
                        .then(() => msg.channel.send(client.embeds.config.formatSet(cfgValue)))
                        .then(success => {
                            msg.delete(30000);
                            fMsg.delete(30000);
                            cMsg.delete(30000);
                            return success.delete(30000);
                        })
                        .then(() => utils.setNickname(msg.guild, client))
                        .catch((err) => msg.channel.send(client.embeds.generalError("Error writing config data to database:", err)));
                    }
                    return msg.channel.send(client.embeds.config.incorrectFormat());
                });

            case "🤖":
                if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send(client.embeds.config.noAdmin());
                return cMsg.edit(client.embeds.config.botCount())
                .then(() => {
                    if(msg.guild.me.hasPermission("MANAGE_MESSAGES")) return cMsg.clearReactions();
                    return undefined;
                })
                .then(() => cMsg.react("✅"))
                .then(() => cMsg.react("❎"))
                .then(() => cMsg.awaitReactions((reaction, user) => (reaction.emoji.name === "✅" || reaction.emoji.name === "❎") && user.id === msg.author.id, {
                    time: 60000,
                    max: 1
                }))
                .then(r => {
                    if(r.size !== 1) return undefined;
                    if(r.first().emoji.name == "✅") {
                        let cfgValue = args.slice(1)
                        .join(" ");
                        // Transform config value by keys type transformation function.
                        cfgValue = 1;
                        // Update guild config in database.
                        return client.db.setGuildConfig(msg.guild, { countBots: cfgValue })
                        .then(() => msg.channel.send(client.embeds.config.botCountSet("yes")))
                        .catch((err) => msg.channel.send(client.embeds.generalError("Error writing config data to database:", err)));
                    }
                    const cfgValue = 0;
                    // Update guild config in database.
                    return client.db.setGuildConfig(msg.guild, { countBots: cfgValue })
                    .then(() => msg.channel.send(client.embeds.config.botCountSet("no")))
                    .then(success => {
                        msg.delete(30000);
                        cMsg.delete(30000);
                        return success.delete(30000);
                    })
                    .then(() => utils.setNickname(msg.guild, client))
                    .catch(err => msg.channel.send(client.embeds.generalError("Error writing config data to database:", err)));
                });

            default:
                return undefined;
        }
    })
    .then(() => {
        // FINISHED
    })
    .catch(console.error);
};