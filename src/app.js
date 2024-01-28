const {config} = require('dotenv').config();       
const {Client, GatewayIntentBits, WebhookClient}  = require ('discord.js');

const client = new Client( { 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],

  partials: ['MESSAGE', 'REACTION']
});


//Webhook
const webHook = new WebhookClient(
   process.env.WEBHOOK_ID,
   process.env.WEBHOOK_TOKEN,
)


//Ready event (whenever we start the bot)
client.on('ready', () => {
   console.log(`${client.user.username} has logged in...`)       //Output = Bot1119 has logged in...
})


//For making our own command starts with "$" symbol
const PREFIX = '$';

//messageCreate event = Emitted whenever a message is created. 
client.on('messageCreate', (message) => {
  
    //Whether or not the user is a bot(used to prevent the bot to reply to its own msg)  
    if(message.author.bot) return ;                              
    
    //Output = [parasss19] : hii
    console.log(`[${message.author.tag}] : ${message.content}`)  
    
    if(message.content === 'hello'){
      message.channel.send("helloo");
    }
  
   
    //**** OUR OWN COMMANDS *** : If command starts with "$" then we perform this
    if (message.content.startsWith(PREFIX)) {        
        const [command_name, ...args] = message.content
          .trim()
          .substring(PREFIX.length)
          .split(/\s+/)

          //If i write this command(message.content) = $kick 4455 33
          // console.log(command_name)  // kick
          // console.log(args)          // [ '4455', '33' ]
   
          //For Kick command
          if (command_name === 'kick') {

            //Users not have permisson to kick other users
            // if (!message.member.hasPermission('KICK_MEMBERS')){
            //   return message.reply('You do not have permissions to use that command');
            // }
             
            //Check if ID of user is provided or not
            if(args.length === 0){
              return message.reply("Please provide an ID");
            }

            //Check the member is present in the server(Guild) or not
            const member = message.guild.members.cache.get(args[0]);

            //If memeber is present then kick 
            if(member) {
              member
              .kick()
              .then((member) => message.channel.send(`${member} was kicked `))
              .catch((err) => message.channel.send('I cannot kick that user '));
            } else {
              message.channel.send("User not found");
            }
          }

          //For Ban command 
          else if(command_name === 'ban') {

            //Users not have permisson to kick other users
            // if (!message.member.hasPermission('BAN_MEMBERS')){
            //   return message.reply('You do not have permissions to use that command');
            // }
            
            //Check if ID of user is provided or not
            if(args.length === 0){
              return message.reply("Please provide an ID");
            }

            //In ban command we dont need to check the user present in guild or not
            message.guild.members.ban(args[0])
              .then((member) => message.channel.send(`${member} was Banned `))
              .catch((err) => message.channel.send('I cannot Ban that user '));
          }

          

    }
})


//Providing Roles using Reactions = messageReactionAdd event(Emitted whenever a reaction is added to a cached message.)
//We can also use async/await
client.on('messageReactionAdd', (reaction, user) => {
  console.log('hello');
  const { name } = reaction.emoji;
  const member =  reaction.message.guild.members.cache.get(user.id);

  if (reaction.message.id === '1201105345360171089') {
      switch (name) {
        case '🍎': 
          member.roles.add('1201108305922244678');
          break;
        case '🍑': 
          member.roles.add('1201108514551103488');
          break;
        case '🍇': 
          member.roles.add('1201108412226863174');
          break;
      }
  }
});


//Removing Roles
client.on('messageReactionRemove', (messageReaction, user) => {
  const { name } = messageReaction.emoji;
  const member =  messageReaction.message.guild.members.get(user.id);

  if (messageReaction.message.id === '1201105345360171089') {
      switch (name) {
          case '🍎': 
              member.roles.remove('1201108305922244678');
              break;
          case '🍑': 
              member.roles.remove('1201108514551103488');
              break;
          case '🍇': 
              member.roles.remove('1201108412226863174');
              break;
      }
  }
});


//Login using the token
client.login(process.env.BOT_TOKEN);


//Note
// 1 The 'dotenv' package is commonly used in Node.js applications to load environment variables from a file named .env into the process environment.
// 2 config() = This function reads the variables defined in the .env file and adds them to the process.env object, making them accessible throughout the application.
// It's important to call this function early in the application's startup process to ensure that environment variables are loaded before they are used elsewhere in the code.
