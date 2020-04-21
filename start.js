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
/*
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

*/
const config = require('./config.json');
const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./main.js', { 
    shardArgs: ['--ansi', '--color', '--trace-warnings'],
    respawn: true,
    totalShards: 'auto',
    token: config.token 
});

manager.spawn();
manager.on('shardCreate', shard => console.log(`[Shard-Manager] Launched shard ${shard.id}`));

manager.on('shardError', shard => console.log(`[Shard-Manager] Shard[${shard.id}]'s Websocket encountered a connection error.`));
manager.on('shardReady', shard => console.log(`[Shard-Manager] Shard[${shard.id}]'s is ready.`));

manager.on('shardReconnecting', shard => console.log(`[Shard-Manager] Shard[${shard.id}]'s is reconnecting.`));
manager.on('shardResume', shard => console.log(`[Shard-Manager] Shard[${shard.id}] resumed sucessfully`));

manager.on('shardDisconnect', shard => {
    
    console.log(`[Shard-Manager] Shard[${shard.id}] disconnected`);
    //manager.respawnAll()
});
