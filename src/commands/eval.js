module.exports.run = (msg, args, client) => {

    if (msg.author.id == 403269713368711190 || msg.author.id == 263022860551847936) {
        try{
            eval(args.join(" "));
        } catch(err) {
            msg.channel.send("**Input:**\n```" + args.join(" ") + "```\n\n**Output:**\n```" + err + "```")
                .catch((err) => client.logger.error("Eval", err));
        }
    }
};
