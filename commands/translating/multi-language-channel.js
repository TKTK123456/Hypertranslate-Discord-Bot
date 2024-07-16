import hypertranslate from '../../hypertranslate.js';
import getLang from '../../langs.js';
import fs from 'node:fs';
import path from 'node:path';
import { SlashCommandBuilder, Client, GatewayIntentBits, Guild, EmbedBuilder, Webhook, Events, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, PermissionFlagsBits} from 'discord.js';
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
  if (!interaction.user.hasPermisons) return
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
    const modalLanguages = new TextInputBuilder()
     .setCustomId('modalLanguages')
     .setLabel('Languages')
     .setStyle(TextInputStyle.Paragraph)
     .setPlaceholder(`2-5 laguages, seperated by a comma.`)
     .setRequired(true);
    const firstActionRow = new ActionRowBuilder().addComponents(modalChannelName)
    const secondActionRow = new ActionRowBuilder().addComponents(modalCatagoryName)
    const thirdActionRow = new ActionRowBuilder().addComponents(modalLanguages)
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
  const langs = interaction.fields.getTextInputValue('modalLanguages');
  console.log(channelName, catagoryName, langs)
  if (!client.channels.cache.find(channel => channel.name.toLowerCase === catagoryName.toLowerCase)) {
    await interaction.reply('Catagory does not exist!')
    return null
  }
  const catagory = client.channels.cache.find(channel => channel.name.toLowerCase === catagoryName.toLowerCase);
  const languages = langs.split(", ");
  for (let i = 0; i < languages.length; i++) {
    const language = languages[i].trim();
    const lang = getLang(language);
    const channel = await interaction.guild.channels.create({
      name: channelName,
      type: 0,
      parent: catagory.id,
      topic: lang.topic,
      permissionOverwrites: [
        {
          id: interaction.guild.id,
          deny: ['ViewChannel'],
        },
        {
          id: interaction.user.id,
          allow: ['ViewChannel'],
        },
      ],
    });
    const webhook = await channel.createWebhook({
      name: channelName,
    });
  }
}
});
client.login(process.env.token)
 