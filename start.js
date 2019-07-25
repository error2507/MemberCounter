const { ShardingManager } = require('discord.js');
const config = require('./config.json');

const debugMode = process.argv.includes('debug');
let args = [];
try {
    if (debugMode)
        args = ["debug"];
} catch (err) {
    console.error('[ FATAL ] Failed parsing config.json: ', err);
    process.exit(1);
}

const Manager = new ShardingManager('./main.js', {
    shardArgs: args,
    totalShards: 'auto',
    respawn: true,
    token: config.token,
});
Manager.spawn();
Manager.on('launch', (shard) => {
    console.log(`Launched shard ${shard.id}`);
});

