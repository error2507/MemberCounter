module.exports = {

    getMemberCount(guild) {
        if (!guild)
            return 0;
        return guild.members.filter((m) => !m.user.bot).size;
    }

};