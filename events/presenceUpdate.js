const utils = require('../utils');

module.exports.run = (oldmember, newmember, client) => {
    if (oldmember.presence.status != newmember.presence.status) {
        if (newmember.guild.me.hasPermission("CHANGE_NICKNAME") || newmember.guild.me.hasPermission("ADMINISTRATOR")) {
            let handlerName = 'presenceupdate#'+newmember.guild.id
            if (!client.timeout.getTimeoutHandler(handlerName))
                client.timeout.register(handlerName, 60 * 1000, 1);
            if (client.timeout.check(handlerName) == 0)
                utils.setNickname(newmember.guild, client);
        }
    }
};