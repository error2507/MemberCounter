module.exports.run = async (msg, args, client) => {
    if (msg.author.id == 403269713368711190) {
        try {
            msg.channel.send("**Input:**\n```" + args.join(" ") + "```\n\n**Output:**\n```" + eval(args.join("")) + "```");
        } catch(err) {
            msg.channel.send("**Input:**\n```" + args.join(" ") + "```\n\n**Output:**\n```" + err + "```");
        }  
    }
}