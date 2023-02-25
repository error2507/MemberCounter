module.exports.run = (client) => {
    console.log(`[ INFO ] logged in as ${client.user.tag} (ID: ${client.user.id})`);
    if (client.config.dblToken && client.config.dblToken != '') {
        client.shard.fetchClientValues('guilds.size')
            .then(results => {
                client.dbl.postStats(results.reduce((prev, memberCount) => prev + memberCount, 0));
            })
        setInterval(function() {
            client.shard.fetchClientValues('guilds.size')
                .then(results => {
                    client.dbl.postStats(results.reduce((prev, memberCount) => prev + memberCount, 0));
                })
        }, 300000);
    }
    client.user.setActivity('MemberCounter', { type: 3 });
};
