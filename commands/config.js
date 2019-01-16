const stdConfig = {
    "format":    "%all%",
    "countBots": true,
};

module.exports.run = (msg, args, client) => {
    let guildConfig = client.db.get(`guilds.${msg.guild.id}.config`).value();
    if (!guildConfig)
        guildConfig = stdConfig;
    if (args.length < 1) {
        console.log(client.embeds.config.list(guildConfig));
        msg.channel.send(client.embeds.config.list(guildConfig))
            .catch((err) => console.error("[ ERROR ] ", err));
        return;
    }
};