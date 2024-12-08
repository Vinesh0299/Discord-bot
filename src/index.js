require('dotenv').config();
const fs = require('fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

// Import the logger
const logger = require('./utils/logger');

// Get the environment variables
const { BOT_TOKEN } = process.env;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Log in to Discord with your bot's token and print a message when the bot is ready
client.once(Events.ClientReady, readyClient => {
    logger.info(`Logged in as ${readyClient.user.tag}!`);
});

// Initialize the commands collection
client.commands = new Collection();

// Read the commands directory
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

        // Add the command to the collection
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            logger.warn(`The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

// Add an event listener for the interactionCreate event
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        logger.warn(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        logger.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});

client.login(BOT_TOKEN);