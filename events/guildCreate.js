const utils = require('../utils');

const stdConfig = {
    "format": "%all%",
    "countBots": 1,
};

let success = false;

module.exports.run = (newguild, client) => {
    client.db.getGuildConfig(newguild)
    .then(_guildConfig => {
        let guildConfig = _guildConfig;

        if (Object.keys(guildConfig).length == 0) {
            guildConfig = stdConfig;
            client.db.setGuildConfig(newguild, stdConfig)
            .then(() => {
                success = true;
            })
            .catch(() => {
                success = false;
            });
        }
    });
    
    if (newguild.me.hasPermission("CHANGE_NICKNAME") || newguild.me.hasPermission("ADMINISTRATOR")) {
        utils.setNickname(newguild, client);
    } else {
        newguild.owner.user.send("Hey! I saw someone added me to " + newguild.name + ". I am pretty excited to show how many members are on there. But to do so I need to have the permission to change my nickname. Please give that permission to me.")
            .catch((err) => console.error("[ ERROR ] ", err));
    }

    // JOIN MESSAGE
    let memb = client.users.get("403269713368711190");
    if (memb)
        memb.send(`I joined **${newguild.name}** with **${newguild.memberCount}** members. DB set: **${success}**`)
            .catch((err) => console.error("[ ERROR ] ", err));
}