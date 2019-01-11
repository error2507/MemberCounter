module.exports.run = (oldmember, client) => {
    await oldmember.guild.fetchMember(client.user);
    if (oldmember.guild.me.hasPermission("CHANGE_NICKNAME") || oldmember.guild.me.hasPermission("ADMINISTRATOR")) {
        oldmember.guild.me.setNickname(oldmember.guild.memberCount);
    }
}