import hypertranslate from '../../hypertranslate.js';
import getLang from '../../langs.js';
import { SlashCommandBuilder, Client, GatewayIntentBits, Guild, EmbedBuilder, Webhook} from 'discord.js';
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

}