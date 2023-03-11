const process = require('process');
const commandLineArgs = require('command-line-args');
const { ShardingManager } = require('discord.js');

// look out for the user specifying a custom config or if new commands should be registered
const optionDefinitions = [
    {
        name: 'setup-commands',
        alias: 's',
        type: Boolean,
        defaultValue: false
    },
    {
        name: 'config',
        alias: 'c',
        type: String,
        defaultValue: __dirname + '/config.json'
    }
]
const args = commandLineArgs(optionDefinitions);
// try to get the specified config
let config;
try {
    config = require(args.config);
} catch (err) {
    console.error("FATAL ERROR Could not load " + args.config + " as config");
    process.exit(5);
}

// spawning all shards
const Manager = new ShardingManager('./main.js', {
    // ignore first to indicies because they are from the initial command
    shardArgs: process.argv.slice(2),
    totalShards: 'auto',
    respawn: true,
    token: config.token,
});
Manager.spawn();
Manager.on('shardCreate', shard => {
    console.log(`Created shard ${shard.id}`);
});
Manager.on('launch', (shard) => {
    console.log(`Launched shard ${shard.id}`);
});
