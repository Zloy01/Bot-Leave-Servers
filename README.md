# Bot Leave Servers
A script that makes your Discord bot automatically leave servers with fewer members than a specified threshold.

## 📚 How to Use?
1. Create a folder for the script and open a terminal in that folder.
2. Run the command: npm install to install the required dependencies.
3. Once the installation is complete, open the config.js file.
4. In the token field, insert your bot’s token, and in the members field, specify the minimum number of members.
5. Run the script. The bot will check all the servers it’s on. If a server has fewer members than specified in config.js, the bot will leave that server.

## ⁉️ Why Use It?
This script is handy when you’re facing issues with bot verification on Discord. For instance, if Discord flags an error suggesting that servers were artificially "boosted," this script helps "clean up" the server list by keeping only those that meet your criteria.