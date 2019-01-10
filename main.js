const Discord = require('discord.js');
const fs = require('fs');
const DBL = require("dblapi.js");
const client = new Discord.Client();
const config = require('./config.json');
const dbl = new DBL(config.dblToken);
const embeds = require('./embeds.js');
const cooldown = new Set();


// Getting commands from ./commands/
client.commands = new Map();
fs.readdirSync('./commands', (err, files) => {
    files.forEach(file => {
        if (file.endsWith('.js')) {
            client.commands.set(file.split('.')[0], require(`./commands/${file}`));
        }
    });
})


client.on('ready', function(){
    console.log("MemberCounter is ready!");
    dbl.postStats(client.guilds.size);
    setInterval(function() {
        dbl.postStats(client.guilds.size);
    }, 300000);
    client.user.setActivity('%help', { type: 'PLAYING' });
})
client.on('message', msg => {
    if (msg.content.startsWith(config.prefix) && !msg.author.bot) {
        if (client.commands.has(msg.content.split(' ')[0].substr(config.prefix.length))) {
            
        }
    }
    
    
    /*var cont = msg.content;
    if (cont.startsWith(config.prefix) && !msg.author.bot) {
        var invoke = cont.split(' ')[0].substr(config.prefix.length),
            args   = cont.split(' ').slice(1);

        if (invoke in cmdmap) {
            cmdmap[invoke](msg, args);
        }
    }  */ 
});

var cmdmap = {
    update: cmd_update,
    help: cmd_help,
    invite: cmd_invite,
    stats: cmd_stats,
    oeval: cmd_oeval,
    eval: cmd_eval
}

async function cmd_update(msg, args) {
    if (msg.channel.type == "dm") {
        msg.channel.send(embeds.update.dm());
    } else {
        await msg.guild.fetchMember(client.user);
        if (cooldown.has(msg.guild.id)) {
            msg.channel.send(embeds.update.cooldown());
        } else {
            if ((msg.guild.me.hasPermission("CHANGE_NICKNAME") || msg.guild.me.hasPermission("ADMINISTRATOR")) && msg.guild.id != 403269713368711190) {
                msg.channel.send(embeds.update.success(msg.guild.memberCount))
                msg.guild.me.setNickname(msg.guild.memberCount);
                cooldown.add(msg.guild.id)
                setTimeout(() => {
                    cooldown.delete(msg.guild.id);
                }, 600000);
            } else {
                msg.channel.send(embeds.update.missingPerms());
            }
        }
    }
}

function cmd_help(msg, args) {
    msg.channel.send(embeds.help(client.users.get('403269713368711190').tag));
}

function cmd_invite(msg, args) {
    msg.channel.send(embeds.invite(client.users.get('403269713368711190').tag));
}

function cmd_stats(msg) {
    let charset = ['e', 'r', 'o', '2', '5', '0', '7', 'm', 'b', 'c', 'u', 'n', 't'];
    let random = '';
    for (d = 0; d < 6; d++) {
        random = random + charset[Math.floor(Math.random() * charset.length)];
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



client.login(config.token);