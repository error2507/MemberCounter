module.exports.run = (oldmember, client) => {
    oldmember.guild.fetchMember(client.user).then(() => {
        if (oldmember.guild.me.hasPermission("CHANGE_NICKNAME") || oldmember.guild.me.hasPermission("ADMINISTRATOR")) {
            oldmember.guild.me.setNickname(oldmember.guild.memberCount)
                .catch((err) => console.error("[ ERROR ] ", err));
        }
    }).then((err) => console.error("[ ERROR ] ", err));
};