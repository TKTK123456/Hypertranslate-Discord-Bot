import hypertranslate from '../../hypertranslate.js';
import getLang from '../../langs.js';
import fs from 'node:fs';
import path from 'node:path';
import { SlashCommandBuilder, Client, GatewayIntentBits, Guild, EmbedBuilder, Webhook, Events, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,]
});
export const data = new SlashCommandBuilder()
    .setName('multi-language-channel')
    .setDescription("Create's multi language channels! (Only works in English text)");
export async function execute(client, interaction) {
    const modalChannelName = new TextInputBuilder()
    .setCustomId('modalChannelName')
    .setLabel('Channel Name')
    .setStyle(TextInputStyle.Short)
    .setRequired(true);
    const modalCatagoryName = new TextInputBuilder()
     .setCustomId('modalCatagoryName')
     .setLabel('Catagory Name')
     .setStyle(TextInputStyle.Short)
     .setRequired(true);
    const modalLanguageNumber = new TextInputBuilder()
     .setCustomId('modalLanguageNumber')
     .setLabel('Lanuage amount (max 5)')
     .setStyle(TextInputStyle.Short)
     .setRequired(true);
    const firstActionRow = new ActionRowBuilder().addComponents(modalChannelName)
    const secondActionRow = new ActionRowBuilder().addComponents(modalCatagoryName)
    const thirdActionRow = new ActionRowBuilder().addComponents(modalLanguageNumber)
    const modals = new ModalBuilder()
    .setCustomId('modal')
    .setTitle('Multi Language Channel');
    modals.addComponents(firstActionRow, secondActionRow, thirdActionRow);
    await interaction.showModal(modals);
  
}
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isModalSubmit()) return;
  if (interaction.customId === 'modal') {
    const channelName = interaction.fields.getTextInputValue('modalChannelName');
    const catagoryName = interaction.fields.getTextInputValue('modalCatagoryName');
    const languageNumber = parseInt(interaction.fields.getTextInputValue('modalLanguageNumber'));
    console.log(channelName, catagoryName, languageNumber)
    if (isNaN(languageNumber)) {
      await interaction.reply('You need a number!')
      return null
    }
    if (languageNumber > 5) {
      await interaction.reply('You can only have 5 languages!')
      return null
    }
    if (languageNumber < 2) {
      await interaction.reply('You need at least 2 languages!')
      return null
    }
    if (!client.channels.cache.find(channel => channel.name === channelName)) {
      await interaction.reply('Catagory does not exist!')
      return null
    }
  }
});
client.login(process.env.token)