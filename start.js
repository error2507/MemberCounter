const { ShardingManager } = require('discord.js');
const config = require('./config.json');

const Manager = new ShardingManager('./main.js', {
    totalShards: 'auto',
    respawn: true,
    token: config.token,
});
Manager.spawn();
Manager.on('launch', (shard) => {
    console.log(`Launched shard ${shard.id}`);
});

