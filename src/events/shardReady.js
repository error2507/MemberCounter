const chalk = require('chalk');
module.exports.run = (id, unavailableGuilds) => {
    console.log(chalk.green.bold(`[Shard ${id}] is ready and logged in.`));
    if(unavailableGuilds) return console.log(unavailableGuilds);
};