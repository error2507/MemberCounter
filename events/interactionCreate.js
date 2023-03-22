module.exports.run = (interaction, client) => {
    switch (interaction.type) {
        // written command
        case 2:
            client.commands.get(interaction.commandName).run(interaction, client);
    }
    console.log(interaction)
};