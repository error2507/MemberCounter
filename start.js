const process = require('process');

let config;
let args = [];
// read arguments
// only existing argument: --config=path/to/file.json
if (process.argv.length > 2) {
    args = process.argv.slice(2);
    try {
        if (args[0].startsWith("--config=")) {
            config = require(args[0].split('=')[1]);
        } else {
            throw new Error("No valid config argument found");
        }
    } catch (err) {
        console.log(err)
    }
} else {
    config = require('./config.json');
}

const { ShardingManager } = require('discord.js');

const Manager = new ShardingManager('./main.js', {
    shardArgs: args,
    totalShards: 'auto',
    respawn: true,
    token: config.token,
});
Manager.spawn();
Manager.on('shardCreate', shard => {
    console.log(shard);
})
Manager.on('launch', (shard) => {
    console.log(`Launched shard ${shard.id}`);
});

