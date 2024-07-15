import { SlashCommandBuilder, Client, GatewayIntentBits, Guild, EmbedBuilder } from 'discord.js';
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,]
});
import { readdirSync } from 'node:fs';
import { resolve, join} from 'node:path';
const __dirname = resolve();
const directoryPath = join(__dirname, 'commands/utility');
console.log(__dirname);
const files = readdirSync(directoryPath)
   .filter(fileName => fileName.endsWith('.js'))
   .map(fileName => fileName.replace('.js', ''))
   .join('\n');
console.log(`${files} from ${directoryPath}`);
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