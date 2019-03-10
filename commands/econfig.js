module.exports.run = async (msg, args, client) => {
    msg.channel.send(client.embeds.config.chooseOption()).then(async cMsg => {
        await cMsg.react("👁");
        await cMsg.react("✏");
        await cMsg.react("🤖");
    })
}