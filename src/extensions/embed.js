// Template Embed Builder for error2507
/**
 *
 * @param {DiscordClient} client
 * @param {String} title
 * @param {String} content
 * @param {Integer} color
 * @param {Object} fields
 */

module.exports = (client, title, description, color, fields) => {
	return { embed :{
		/* author:{
        name: client.user.username,
        icon_url: client.user.avatarURL
      },*/
		title: title,
		description: description,
		color: color,
		fields: fields,
		footer: {
			'text': 'MemberCounter#0402',
			'icon_url': 'https://images.discordapp.net/avatars/448845486515027970/5be0e8989adc15cb63c83a4ff25cecb6.png?size=512',
		},
	},
	};
};