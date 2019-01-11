const dbl = new DBL(client.config.dblToken);
module.exports = (client) => {
    console.log(client.user.tag + " (ID: " + client.user.id + ") is ready.");
    console.log("MemberCounter is ready!");
    if (!client.config.enabled) {
        dbl.postStats(client.guilds.size);
    setInterval(function() {
        dbl.postStats(client.guilds.size);
    }, 300000);
    client.user.setActivity('%help', { type: 'PLAYING' });
    }
}