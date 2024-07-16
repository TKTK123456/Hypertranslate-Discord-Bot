import { SlashCommandBuilder, Client, GatewayIntentBits, Guild } from 'discord.js';
import hypertranslate from '../../hypertranslate.js';
import getLang from '../../langs.js';
const wait = await import('node:timers/promises').setTimeout;
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,]
});
export const data = new SlashCommandBuilder()
    .setName('hyper-translate')
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
      option.setName('count')
        .setDescription('The number of times to translate')
        .setRequired(true))
export async function execute(client, interaction, wait) {
  await interaction.reply(`Translating...`)
  try {
    const text = await interaction.options.getString('text')
    console.log(text)
    const startLang = await getLang(interaction.options.getString('begin_lang'))
    const endLang = await getLang(interaction.options.getString('end_lang'))
    const count = await interaction.options.getInteger('count')
    console.log(text, startLang, endLang, count)
    const output = await hypertranslate(text, startLang, endLang, count)
    await interaction.editReply(output)
  } catch (error) {
    await interaction.editReply(`An error occured while translating please try again later.`)
    console.error(`Error executing /hyper-translate: ${error}`);
  }
} 