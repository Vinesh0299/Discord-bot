require('dotenv').config();

// Import required modules
const { REST, Routes } = require('discord.js');

// Import environment variables
const { BOT_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

// Import logger
const logger = require('./utils/logger');

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(BOT_TOKEN);

// Deploy all commands!
(() => {
    try {
        logger.info(`Started Deleting application commands.`);

        // Added scope of removing commands
        logger.info(GUILD_ID ? `Guild ID: ${GUILD_ID}` : 'Global');

        rest.put(
            GUILD_ID ? Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID) : Routes.applicationCommands(CLIENT_ID),
            { body: [] },
        )
        .then(() => logger.info(`Successfully deleted all application commands.`))
        .catch(logger.error);

    } catch (error) {
        logger.error(error);
    }
})();
