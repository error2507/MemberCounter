
Reference for error2507: https://discordjs.guide/popular-topics/intents.html

# Don't use this branch for self-hosting! Use the master branch. This here is in an early stage of development -> not tested. 
<p align="center">
  <img width="460" height="300" src="https://raw.githubusercontent.com/error2507/MemberCounter/d.js-v12-update/images/5be0e8989adc15cb63c83a4ff25cecb6.png">
</p>
<a href="https://top.gg/bot/448845486515027970" >
  <img src="https://discordbots.org/api/widget/448845486515027970.svg" alt="MemberCounter" />
</a>


# MemberCounter#0402

MemberCounter is a simple Discord Bot that shows the current amount of members of a guild as its nickname.

## Best way to use it
The best way to use it is to place MemberCounters role at top of all roles or at least over the Member role or whatever role you have. Then set it as hoisted and you will instantly see how many members your server has.

## Commands
* `%help`: Displays all avaible commands and instructions for the setup of MemberCounter.
* `%config`: Display/Edit the current guild configuration.
* `%update`: Update my nickname manually.
* `%invite`: Displays the invite link for me and my support server.
* `%stats`: Displays my stats on top.gg.

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](https://github.com/error2507/MemberCounter/blob/d.js-v12-update/LICENSE) file for details.

## Self Hosting

Self hosting MemberCounter is not supported and no help will be provided. I am not responsible or liable for any self hosted clones of MemberCounter.

## Guild Specific Configuration

| Key | Type | Example | Description |
|-----|------|---------|-------------|
| `format` | string | `%all%` | Format the count which will be displayed in the nickname:<br>`%all%` - Counts all members<br>`%online%` - Counts the online members<br>`%offline%` - Counts the offline members |
| `countBots` | boolean | `true` | True -> Bots will be counted. |

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
