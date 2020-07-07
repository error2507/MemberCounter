const chalk = require('chalk');
const df = require('dateformat');

/**
  * Register new logger.
  * @param {string} module     Name of the module.
  * @param {string} message    Message to log.
  * @returns Prints to console.
  */

module.exports = {
	info(module, message) {
		if(!module) {
			return console.log(chalk.blue('[' + df(new Date(), 'HH:MM:ss') + ']  info  ') + ': ' + message);
		}
		return console.log('[' + df(new Date(), 'HH:MM:ss') + ']' + chalk.blue('  info  ') + '[' + module + ']' + ': ' + message);
	},
	warn(module, message) {
		if(!module) {
			return console.log('[' + df(new Date(), 'HH:MM:ss') + ']' + chalk.yellow('  warning  ') + ': ' + message);
		}
		return console.log('[' + df(new Date(), 'HH:MM:ss') + ']' + chalk.yellow('  warning  ') + '[' + module + ']' + ': ' + message);
	},
	error(module, message) {
		if(!module) {
			return console.log('[' + df(new Date(), 'HH:MM:ss') + ']' + chalk.red('  error  ') + ': ' + message);
		}
		return console.log('[' + df(new Date(), 'HH:MM:ss') + ']' + chalk.red('  error  ') + '[' + module + ']' + ': ' + message);
	},
	fatal(module, message) {
		if(!module) {
			return console.log('[' + df(new Date(), 'HH:MM:ss') + ']' + chalk.red('  fatal  ') + ': ' + message);
		}
		return console.log('[' + df(new Date(), 'HH:MM:ss') + ']' + chalk.red('  fatal  ') + '[' + module + ']' + ': ' + message);
	},
	debug(module, message) {
		if(!module) {
			return console.log('[' + df(new Date(), 'HH:MM:ss') + ']' + chalk.green('  debug  ') + ': ' + message);
		}
		return console.log('[' + df(new Date(), 'HH:MM:ss') + ']' + chalk.green('  debug ') + '[' + module + ']' + ': ' + message);
	},
};
