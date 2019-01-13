const Discord = require('discord.js')
module.exports.run = async (msg, args, client) => {
    if (msg.author.id == 403269713368711190) {
        try{
            eval(args.join(" "));
        } catch(err) {
            msg.channel.send("**Input:**\n```" + args.join(" ") + "```\n\n**Output:**\n```" + err + "```");
        }
    }
}
