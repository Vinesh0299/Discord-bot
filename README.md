# Discord-bot

A simple Discord bot built with Discord.js that performs various utility functions.

## Prerequisites

Before running this bot, make sure you have:

- Node.js (v16.x or higher)
- npm (Node Package Manager)
- A Discord account and a registered application/bot on the [Discord Developer Portal](https://discord.com/developers/applications)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/discord-bot.git
cd discord-bot
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and add your Discord bot token. Alternatively, you can set these variables as environment variables if you are using Docker:

```bash
BOT_TOKEN=<your-bot-token>
LOG_LEVEL=<log-level>
```

## Running the Bot

To start the bot, run the following command:

```bash
npm start
```

For development with auto-reload, run the following command:

```bash
npm run start-dev
```

## Features

- Basic bot setup with Discord.js
- Logging system using Winston

## Project Structure

- `src/index.js`: Main bot file
- `src/utils/logger.js`: Logging utility using Winston
- `package.json`: Project dependencies and scripts
- `.env`: Environment variables
- `README.md`: This file

## License

This project is licensed under the ISC License.

## Author

Vinesh Katewa

## Links

- [GitHub Repository](https://github.com/Vinesh0299/Discord-bot)
- [Issue Tracker](https://github.com/Vinesh0299/Discord-bot/issues)