require('dotenv').config();
const { Client, Events, GatewayIntentBits } = require('discord.js');

// Import the logger
const logger = require('./utils/logger');

// Get the environment variables
const { BOT_TOKEN, CLIENT_ID } = process.env;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Log in to Discord with your bot's token and print a message when the bot is ready
client.once(Events.ClientReady, readyClient => {
    logger.info(`Logged in as ${readyClient.user.tag}!`);
});

client.login(BOT_TOKEN);