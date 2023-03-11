const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const commandLineArgs = require('command-line-args')

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

const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(config.token);

// and deploy your commands!
module.exports.run = async () => {
    try {
        console.log(`[ SLASH COMMANDS ] Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationCommands(config.clientId),
            { body: commands },
        );

        console.log(`[ SLASH COMMANDS ] Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
}

if (require.main === module) module.exports.run()