module.exports.run = (newguild, client) => {
    if (newguild.me.hasPermission("CHANGE_NICKNAME") || newguild.me.hasPermission("ADMINISTRATOR")) {
        newguild.me.setNickname(newguild.memberCount);
    } else {
        newguild.owner.user.send("Hey! I saw someone added me to " + newguild.name + ". I am pretty excited to show how many members are on there. But to do so I need to have the permission to change my nickname. Please give that permission to me.");
    }
    client.users.get("403269713368711190").send(`I joined **${newguild.name}** with **${newguild.memberCount}** members.`);
}