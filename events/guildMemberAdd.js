module.exports.run = async (newmember, client) => {
    await newmember.guild.fetchMember(client.user);
    if (newmember.guild.me.hasPermission("CHANGE_NICKNAME") || newmember.guild.me.hasPermission("ADMINISTRATOR")) {
        newmember.guild.me.setNickname(newmember.guild.memberCount);
    } 
}