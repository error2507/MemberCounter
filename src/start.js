const { ShardingManager } = require('discord.js');
const config = require('./config.json');
const logger = require('./extensions/logger');


const debugMode = process.argv.includes('debug');
let args = [];
try {
  if (debugMode) {
    args = ['debug'];
  }
} catch (err) {
	logger.fatal('Bot', `Failed parsing config.json: ${err}`);
	process.exit(1);
}

const manager = new ShardingManager('./main.js', {
  token: config.token,
  totalShards: 'auto',
  shardList: 'auto',
  mode: 'process',
  respawn: 'true',
  timeout: 999999,
});

manager.spawn().catch((err) => console.log(err));

// Change the name of the "Nickname changes:" channel in the support guild
/*setInterval(async function() {
  // Get new changes
  let newChanges = 0;
  await manager.fetchClientValues('nicknameChanges')
    .then(changes => {
      newChanges = changes.reduce((a, b) => a + b, 0);
    });
    // Update channel
    manager.broadcastEval(`
      this.channels.fetch(this.config.statsChannel)
        .then(statsChannel => {
          if (statsChannel !== null) {
            const changedBefore = parseInt(statsChannel.name.split(': ').slice(1), 10);
            const totalChanges = changedBefore + ${newChanges};
            statsChannel.setName('Nickname changes: ' + totalChanges).catch(err => {console.log(err)})
            console.log(totalChanges)
          }
        });
        this.nickNameChanges = 0;
    `);
}, 30 * 60000); // 30 minutes*/

// Keeping track of memory usage
const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);