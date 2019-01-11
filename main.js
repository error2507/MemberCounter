const Discord = require('discord.js');
const fs = require('fs');
const DBL = require("dblapi.js");
const client = new Discord.Client();
client.config = require('./config.json');
client.embeds = require('./embeds.js');
const cooldown = new Set();


// Getting commands from ./commands/
client.commands = new Map();
fs.readdirSync('./commands', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (file.endsWith('.js')) {
            client.commands.set(file.split('.')[0], require(`./commands/${file}`));
        }
    });
});

// Getting events from ./events/
fs.readdirSync('./events', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, (client, ...args) => {
            eventFunction.run(client, ...args)
          });
      });
});

function cmd_invite(msg, args) {
    msg.channel.send(embeds.invite(client.users.get('403269713368711190').tag));
}

function cmd_stats(msg) {
    let charset = ['e', 'r', 'o', '2', '5', '0', '7', 'm', 'b', 'c', 'u', 'n', 't'];
    let random = '';
    for (d = 0; d < 6; d++) {
        random += charset[Math.floor(Math.random() * charset.length)];
    }
    msg.channel.send(embeds.stats(random));
}

function cmd_oeval(msg, args) {
    if (msg.author.id == 403269713368711190) {
        try{
                msg.channel.send("**Input:**\n```" + args.join(" ") + "```\n\n**Output:**\n```" + eval(args.join("")) + "```")
            } catch(err) {
                msg.channel.send("**Input:**\n```" + args.join(" ") + "```\n\n**Output:**\n```" + err + "```")
            }
        
    }
}

function cmd_eval(msg, args) {
    if (msg.author.id == 403269713368711190) {
        try{
                eval(args.join(" "))
            } catch(err) {
                msg.channel.send("**Input:**\n```" + args.join(" ") + "```\n\n**Output:**\n```" + err + "```")
            }
        
    }
}

//Auto change nickname
client.on('guildCreate', function(newguild){
    if (newguild.id != 387812458661937152) {
        if (newguild.me.hasPermission("CHANGE_NICKNAME") || newguild.me.hasPermission("ADMINISTRATOR")) {
            newguild.me.setNickname(newguild.memberCount);
        } else {
            newguild.owner.user.send("Hey! I saw someone added me to " + newguild.name + ". I am pretty excited to show how many members are on there. But to do so I need to have the permission to change my nickname. Please give that permission to me.");
        }
    }
    client.users.get("403269713368711190").send(`I joined **${newguild.name}** with **${newguild.memberCount}** members.`);
});

client.on('guildMemberRemove', async function(oldmember){
    await oldmember.guild.fetchMember(client.user);
    if (oldmember.guild.id != 387812458661937152) {
        if (oldmember.guild.me.hasPermission("CHANGE_NICKNAME") || oldmember.guild.me.hasPermission("ADMINISTRATOR")) {
            oldmember.guild.me.setNickname(oldmember.guild.memberCount);
        }
    }
});

client.on('guildMemberAdd', async function(newmember){
    await newmember.guild.fetchMember(client.user);
    if (newmember.guild.id != 387812458661937152) {
        if (newmember.guild.me.hasPermission("CHANGE_NICKNAME") || newmember.guild.me.hasPermission("ADMINISTRATOR")) {
            newmember.guild.me.setNickname(newmember.guild.memberCount);
        } 
    }
});



client.login((client.config.debug.enabled == true ? client.config.debug.token : client.config.token));