const { ShardingManager } = require('discord.js');
const config = require('./config.json');
const logger = require('./extensions/logger');


const debugMode = process.argv.includes('debug');
let args = [];
try {
	if (debugMode) {
		args = ['debug'];
	}
}
catch (err) {
	logger.fatal('Bot', `Failed parsing config.json: ${err}`);
	process.exit(1);
}
/*
const Manager = new ShardingManager('./main.js', {
	shardArgs: args,
	shards: 'auto',
	respawn: true,
	token: config.token,
});
Manager.spawn();
Manager.on('shardCreate', (shard) => {
	console.log(`Launched shard ${shard.id}`);
});
*/

/*
Will switch to .env file
process.env.NODE_ENV || (process.env.NODE_ENV = 'production');
require('dotenv-flow').config();
*/
const manager = new ShardingManager('./main.js', {
  token: config.token,
  totalShards: 40, // totalShards: 4,
  shardList: 'auto',
  mode: 'process',
  respawn: 'true',
  timeout: 999999,
});

manager.spawn().catch((err) => console.log(err));

// Keeping track of memory usage
const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);