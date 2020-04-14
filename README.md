![MemberCounter](https://raw.githubusercontent.com/error2507/MemberCounter/d.js-v12-update/images/5be0e8989adc15cb63c83a4ff25cecb6.png)


<center>
<a href="https://top.gg/bot/448845486515027970" >
  <img src="https://discordbots.org/api/widget/448845486515027970.svg" alt="MemberCounter" />
</a>
</center>
# MemberCounter

MemberCounter is a simple Discord Bot that shows the current amount of members on a guild as its nickname on this guild.

## Best way to use it
The best way to use it is to set MemberCounters role at top of all roles or at least over the Member role or whatever you have. Then set it as hoisted an you will right away see how many members your server has.

## Commands
* `<prefix>help`: Shows a help how to correctly set MemberCounter up and a list of all commands.
* `<prefix>update`: When you believe MemberCounters nickname isn't showing the correct amount of member because of a downtime or whatever, use this command to update its nickname.
* `<prefix>invite`: Shows the link to invite me to your server and the invite link to my support server.
* `<prefix>stats`: Shows the bots stats on discordbots.org.
* `<prefix>config`: Guild specific configuration

## Guild Specific Configuration

| Key | Type | Example | Description |
|-----|------|---------|-------------|
| `format` | string | `%all% (online: %online%)` | Format the count will be displayed in the nickname:<br>`%all%` - all members count<br>`%online%` - online members count<br>`%offline%` - offline members count |
| `countBots` | bool | `true` | Set if bots will be counted or not. |

## Links
* MemberCounters invite: https://discordapp.com/api/oauth2/authorize?client_id=448845486515027970&permissions=67110912&scope=bot
* MemberCounters official support discord server: https://discord.gg/nGu44pF
