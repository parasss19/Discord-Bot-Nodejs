const {Client, GatewayIntentBits}  = require ('discord.js');

const client = new Client( { 
    intents : [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
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

