const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('userinfo').setDescription('Get information about the user'),
    async execute(interaction) {
        await interaction.reply(`Command was executed by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}`);
    },
};
