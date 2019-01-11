module.exports.run = async (msg, args, client) => {
    if (msg.channel.type == "dm") {
        msg.channel.send(client.embeds.update.dm());
    } else {
        await msg.guild.fetchMember(client.user);
        if (cooldown.has(msg.guild.id)) {
            msg.channel.send(client.embeds.update.cooldown());
        } else {
            if ((msg.guild.me.hasPermission("CHANGE_NICKNAME") || msg.guild.me.hasPermission("ADMINISTRATOR")) && msg.guild.id != 403269713368711190) {
                msg.channel.send(client.embeds.update.success(msg.guild.memberCount))
                msg.guild.me.setNickname(msg.guild.memberCount);
                cooldown.add(msg.guild.id)
                setTimeout(() => {
                    cooldown.delete(msg.guild.id);
                }, 600000);
            } else {
                msg.channel.send(client.embeds.update.missingPerms());
            }
        }
    }
}