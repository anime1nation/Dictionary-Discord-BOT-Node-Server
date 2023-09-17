import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import dictonary from "./dictionary.js";
dotenv.config();

const token = process.env.token;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

try {
  // Discord Client login check
  client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
  });

  // Check for any message from discord BOT than reply to the message
  client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    message.reply({
      content:
        "Hey!! from bot! Type /dictionary and write word I will give you the meaning of that word 🖖",
    });
  });

  // check for any intraction by discord bot and perform action
  client.on("interactionCreate", async (interaction) => {
    try {
      const { commandName, options, user } = interaction;
      console.log(user.username);

      //if no any intraction command
      if (!interaction.isCommand()) return;

      if (commandName === "dictionary") {
        const word = options.getString("word");

        const getMeaning = await dictonary(word);

        // reply for the intraction
        await interaction.reply(getMeaning);
      }
    } catch (error) {
      await interaction.reply("Something went wrong!! Try again");
    }
  });

  client.login(token);
} catch (error) {
  console.error(error);
  await interaction.reply("Something went wrong!! Try again");
}
