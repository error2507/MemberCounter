const { MessageEmbed } = require('discord.js');

module.exports.run = (msg, args, client) => {
	// user = client.users.cache.get('403269713368711190');
	//  msg.channel.send(client.embeds.help(user ? user.tag : "error2507", client.config.prefix));

	const prefix = client.config.prefix;

	//msg.channel.send(client.embed(client, 'MemberCounter Help', 'MemberCounter is a simple Discord Bot that shows the current amount of members on a guild as its nickname on this guild.', '#2980b9', [{ 'name': 'Commands', 'value': `:white_small_square:\`${prefix}config\` - Display/Edit the current guild configuration. For more details, see [here](https://github.com/error2507/MemberCounter/blob/master/README.md)\n\n:white_small_square:\`${prefix}update\` - Update my nickname manually.\n\n:white_small_square:\`${prefix}invite\` - Displays the invite link for me and my support server.\n\n:white_small_square:\`${prefix}stats\` - Displays my stats on top.gg.` }]));

	const embed = new MessageEmbed()
		.setAuthor('MemberCounter Help', client.user.displayAvatarURL())
		.setDescription('MemberCounter is a simple Discord Bot that shows the current amount of members on a guild as its nickname.')
		.addField('Commands:', `:white_small_square:\`${prefix}config\` - Display/Edit the current guild configuration. For more details, see [here](https://github.com/error2507/MemberCounter/blob/master/README.md)\n\n:white_small_square:\`${prefix}update\` - Update my nickname manually.\n\n:white_small_square:\`${prefix}invite\` - Displays the invite link for me and my support server.\n\n:white_small_square:\`${prefix}stats\` - Displays my top.gg stats.`)
		.setColor('#2980B9')
		.setTimestamp()
		.setFooter('MemberCounter#0402');
	return msg.channel.send(embed);


	/*const newembed = {
		'description': 'MemberCounter is a discord utility bot that shows the current amount of members on a guild as its nickname.',
		'color': '#2980B9',
		'timestamp': new Date(),
		'footer': {
		  'icon_url': client.user.displayAvatarURL(),
		  'text': `${client.user.username}#${client.user.discriminator}`
		},
		'thumbnail': {
		  'url': client.user.displayAvatarURL()
		},
		'author': {
		  'name': `${client.user.username}#${client.user.discriminator}`,
		  'icon_url': client.user.displayAvatarURL()
		},
		'fields': []
	  }
	  newembed.fields.push({
		name: `Commands`,
		value: `:white_small_square:\`${prefix}config\` - Display/Edit the current guild configuration. For more details, see [here](https://github.com/error2507/MemberCounter/blob/master/README.md)\n\n:white_small_square:\`${prefix}update\` - Update my nickname manually.\n\n:white_small_square:\`${prefix}invite\` - Displays the invite link for me and my support server.\n\n:white_small_square:\`${prefix}stats\` - Displays my stats on top.gg.`
	  })
msg.channel.send({ embed: newembed })
*/
};
