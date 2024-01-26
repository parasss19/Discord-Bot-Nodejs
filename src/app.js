const {config} = require('dotenv');       
const {Client, GatewayIntentBits}  = require ('discord.js');

config();         

const client = new Client( { 
    intents : [
      'Guilds',
      'GuildMessages',
      'MessageContent',
    ]
});

//created listener on client using request = messageCreate
client.on("messageCreate", (message)=> {
    // console.log(message)          //it contain so many properties and info about user
    // console.log(message.content)  // it show the content or basically the msg user type

    if(message.author.bot){
        return;               //here if condition is used to prevent the bot to reply to its own msg
    }else{
      message.reply({
        content : "Hi from Bot1119",
      })
    }
});

//Login using the token
client.login(process.env.BOT_TOKEN);



//Note
// 1 The 'dotenv' package is commonly used in Node.js applications to load environment variables from a file named .env into the process environment.
// 2 This function reads the variables defined in the .env file and adds them to the process.env object, making them accessible throughout the application.
// It's important to call this function early in the application's startup process to ensure that environment variables are loaded before they are used elsewhere in the code.