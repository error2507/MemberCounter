
/* DON'T USE THAT
const config = require('./config.json');
const logger = require('./extensions/logger');
const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./main.js', {
	shardArgs: ['--ansi', '--color', '--trace-warnings'],
	respawn: true,
	totalShards: 'auto',
	token: config.token,
});

manager.spawn();
manager.on('shardCreate', shard => logger.warn('Shard-Manager', `Launched shard ${shard.id}`));

manager.on('shardError', shard => logger.error('Shard-Manager', `Shard[${shard.id}]'s Websocket encountered a connection error.`));
manager.on('shardReady', shard => logger.debug('Shard-Manager', `Shard[${shard.id}]'s is ready.`));

manager.on('shardReconnecting', shard => logger.debug('Shard-Manager', `Shard[${shard.id}]'s is reconnecting.`));
manager.on('shardResume', shard => logger.debug('Shard-Manager', `Shard[${shard.id}] resumed sucessfully`));

manager.on('shardDisconnect', shard => {

	logger.error('Shard-Manager', `Shard[${shard.id}] disconnected`);
	// manager.respawnAll()
});
*/
