import { SlashCommandBuilder, Client, GatewayIntentBits, Guild, EmbedBuilder } from 'discord.js';
import hypertranslate from '../../hypertranslate.js';
import getLang from '../../langs.js';
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,]
});
export const data = new SlashCommandBuilder()
    .setName('translate')
    .setDescription('Translates text.')
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
export async function execute(client, interaction) {
  const text = await interaction.options.getString('text')
  const startLang = await getLang(interaction.options.getString('begin_lang'))
  const endLang = await getLang(interaction.options.getString('end_lang'))
  const output = await hypertranslate(text, startLang, endLang, 1)
  await interaction.reply(output)
}