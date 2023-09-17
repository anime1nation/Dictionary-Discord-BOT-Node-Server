import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config()
const token = process.env.token
const clientId = process.env.clientID

// Creating commands for intraction
const commands = [
  {
    name: 'dictionary', //create service
    description: 'This prompt will give meaning of any word',
    options: [
        {
          name: 'word',
          description: 'Enter the word to get meaning of that word',
          type: 3,
          required: true,
        },
      ],
  },
];

const rest = new REST({ version: '10' }).setToken(token);

try {

  console.log(`Started refreshing application (/${commands.map(x=>x.name)}) commands.`);
  // creating all the intraction commands with option 
  await rest.put(Routes.applicationCommands(clientId), { body: commands });

  console.log(`Successfully reloaded application (/${commands.map(x=>x.name)}) commands.`);
} catch (error) {
  console.error(error);
}