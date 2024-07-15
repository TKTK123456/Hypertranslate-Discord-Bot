import { SlashCommandBuilder, Client, GatewayIntentBits, Guild } from 'discord.js';
import hypertranslate from './hypertranslate.js';
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,]
});
export const data = new SlashCommandBuilder()
    .setName('Hyper-Transalte')
    .setDescription("Transalte's text to random languages a number of times!")
    .addStringOption(option =>
      option.setName('text')
        .setDescription('The text to translate')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('begin_lang')
        .setDescription('The language to translate from')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('end_lang')
        .setDescription('The language to translate to')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName(count)
        .setDescription('The number of times to translate')
        .setRequired(true))
export async function execute(client, interaction, hypertranslate) {
    await interaction.reply(`Pong! ` + client.ws.ping);
} 