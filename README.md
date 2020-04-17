# Don't use this branch for self-hosting! Use the master branch. This here is in an early stage of development -> not tested. 
<p align="center">
  <img width="460" height="300" src="https://raw.githubusercontent.com/error2507/MemberCounter/d.js-v12-update/images/5be0e8989adc15cb63c83a4ff25cecb6.png">
</p>
<a href="https://top.gg/bot/448845486515027970" >
  <img src="https://discordbots.org/api/widget/448845486515027970.svg" alt="MemberCounter" />
</a>


# MemberCounter#0402

MemberCounter is a simple Discord Bot that shows the current amount of members on a guild as its nickname on this guild.

## Best way to use it
The best way to use it is to set MemberCounters role at top of all roles or at least over the Member role or whatever you have. Then set it as hoisted and you will instantly see how many members your server has.

## Commands
* `%help`: Displays all avaible commands and instructions for the setup of MemberCounter.
* `%config`: Display/Edit the current guild configuration.
* `%update`: Update my nickname manually.
* `%invite`: Displays the invite link for me and my support server.
* `%stats`: Displays my stats on top.gg.



## Guild Specific Configuration

| Key | Type | Example | Description |
|-----|------|---------|-------------|
| `format` | string | `%all% (online: %online%)` | Format the count will be displayed in the nickname:<br>`%all%` - all members count<br>`%online%` - online members count<br>`%offline%` - offline members count |
| `countBots` | bool | `true` | True -> bots will be counted. |

## Links
* MemberCounters Invite: https://discordapp.com/api/oauth2/authorize?client_id=448845486515027970&permissions=67110912&scope=bot
* MemberCounters official support server: https://discord.gg/nGu44pF
* Vote for MemberCounter on [top.gg](https://top.gg/bot/448845486515027970)

## Privacy
### Guild settings
As kids, we’re all taught not to touch stuff that doesn’t belong to us. It’s a good guideline.

But in order to make per-server settings possible we need to store a guild identifier. MemberCounter stores therefore the unique guild ID in a database. 
Together with the guild ID we store your personal server settings (your format and botcount). That's it. Period.

Unlike other bots we don’t collect or share your personal user information(e.g messages, ID, name). Ever. There’s literally no data about you on our servers. None. 

We can’t profile you or share your data with others, simply because we don’t have any data to hand over. 
