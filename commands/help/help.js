import { SlashCommandBuilder, Client, GatewayIntentBits, Guild, EmbedBuilder } from 'discord.js';
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,]
});
import { readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
const __dirname = resolve();
const foldersPath = join(__dirname, 'commands');
const commandFolders = readdirSync(foldersPath);
let files ='';
for(const folder of commandFolders) {
  const commandsPath = join(foldersPath, folder);
  files += readdirSync(commandsPath)
    .filter(file => file.endsWith('.js'))
    .map(file => file.replace('.js', '\n'))
}
const commandList = new EmbedBuilder()
.setTitle(`**Help**`)
.setDescription(files)
export const data = new SlashCommandBuilder()
    .setName('help')
    .setDescription('Sends a list of commands!');
export async function execute(client, interaction) {
  console.log(interaction.user.username + ' used /help and got \n' + files)
    await interaction.reply({ embeds: [commandList] });
}