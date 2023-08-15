const process = require('process');
const commandLineArgs = require('command-line-args');
const { ShardingManager } = require('discord.js');
const utils = require('./utils');

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

// if requested by the user, register commands here (async not needed because it does not matter if commands are registered a few seconds after shards are ready)
if (args['setup-commands']) require(__dirname + '/registerCommands').run();

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
    console.log(`[ SHARDS ] Created shard ${shard.id}`);
});

setInterval(() => {
    utils.updateTopGGStats(Manager, config.topToken);
}, 30000)
