# MemberCounter

MemberCounter is a simple Discord Bot that shows the current amount of members in a guild as their nickname in this guild.

## Best way to use it
The best way to use it is to set MemberCounters role at top of all roles or at least over the Member role or whatever you have. Then set it as hoisted and, right away, you will see how many members your server has.

## Commands
* `<prefix>help`: Shows a help how to correctly set MemberCounter up and a list of all commands.
* `<prefix>update`: When you believe MemberCounters nickname isn't showing the correct amount of member because of a downtime or whatever, use this command to update its nickname.
* `<prefix>invite`: Shows the link to invite me to your server and the invite link to my support server.
* `<prefix>stats`: Shows the bot's stats on discordbots.org.
* `<prefix>config`: Guild specific configuration

## Guild Specific Configuration

| Key | Type | Example | Description |
|-----|------|---------|-------------|
| `format` | string | `%all% (online: %online%)` | Format the count will be displayed in the nickname:<br>`%all%` - all members count<br>`%online%` - online members count<br>`%offline%` - offline members count |
| `countBots` | bool | `true` | Set if bots will be counted or not. |

## Links
* MemberCounters invite: https://discordapp.com/api/oauth2/authorize?client_id=448845486515027970&permissions=67110912&scope=bot
* MemberCounters official support discord server: https://discord.gg/nGu44pF
