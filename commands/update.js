const cooldown = new Set();

module.exports.run = (msg, args, client) => {
    if (msg.channel.type == "dm") {
        msg.channel.send(client.embeds.update.dm())
            .then((err) => console.error("[ ERROR ] ", err));
    } else {
        msg.guild.fetchMember(client.user).then((memb) => {
            if (cooldown.has(msg.guild.id)) {
                msg.channel.send(client.embeds.update.cooldown())
                    .then((err) => console.error("[ ERROR ] ", err));
            } else {
                if ((msg.guild.me.hasPermission("CHANGE_NICKNAME") || msg.guild.me.hasPermission("ADMINISTRATOR")) && msg.guild.id != 403269713368711190) {
                    msg.channel.send(client.embeds.update.success(msg.guild.memberCount))
                        .then((err) => console.error("[ ERROR ] ", err));
                    msg.guild.me.setNickname(msg.guild.memberCount)
                        .then((err) => console.error("[ ERROR ] ", err));
                    cooldown.add(msg.guild.id);
                    setTimeout(() => {
                        cooldown.delete(msg.guild.id);
                    }, 600000);
                } else {
                    msg.channel.send(client.embeds.update.missingPerms())
                        .then((err) => console.error("[ ERROR ] ", err));
                }
            }
        });
    }
};