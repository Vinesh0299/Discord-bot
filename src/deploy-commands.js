require('dotenv').config();

// Import required modules
const fs = require('node:fs');
const path = require('node:path');
const { REST, Routes } = require('discord.js');

// Import environment variables
const { BOT_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

// Import logger
const logger = require('./utils/logger');

// Initialize an empty array to store commands
const commands = [];

// Grab all the command files from the commands directory
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// Loop through each command folder
for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    // Loop through each command file in the folder
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            logger.warn(`The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(BOT_TOKEN);

// Deploy all commands!
(() => {
    try {
        logger.info(`Started refreshing ${commands.length} application commands.`);

        // Added scope of deploying commands
        logger.info(GUILD_ID ? `Guild ID: ${GUILD_ID}` : 'Global');

        rest.put(
            GUILD_ID ? Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID) : Routes.applicationCommands(CLIENT_ID),
            { body: commands },
        )
        .then(() => logger.info(`Successfully reloaded ${commands.length} application commands.`))
        .catch(logger.error);

    } catch (error) {
        logger.error(error);
    }
})();
