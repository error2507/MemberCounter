module.exports.run = (client) => {
    if (client.config.dblToken && client.config.dblToken != '') {
        setInterval(function() {
            client.shard.fetchClientValues('guilds.cache.size')
                .then(results => {
                    client.dbl.postStats(results.reduce((prev, memberCount) => prev + memberCount, 0));
                });
        }, 1200000); // every 20 minutes
     }
    client.user.setActivity(client.config.prefix + 'help', { type: 'PLAYING' })
        .catch((err) => client.logger.error('', err));
};