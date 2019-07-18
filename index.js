module.exports = function LFGer(mod) {

  console.log("starting...")
  const Discord = require("discord.js");
  const bot = new Discord.Client();
  const fs = require("fs");
  const path = require("path");
  var default_channel = {
   server: "guild id here",
   channels: "lfg channel id here"
  };
  var default_token = {
   token: "your token here"
  };
  if (!fs.existsSync(__dirname + "\\channel.json")) {

   console.log("Error at channel.json. Re-making the file!\nadd your information then restart the module.")

   fs.writeFileSync(path.join(__dirname, "channel.json"), JSON.stringify(default_channel, null, 2));

  };

  bot.on('message', message => {

    if(message.author != bot.user) return;

   const channel = require(__dirname + "\\channel.json");

   var arg = message.content.split(" ");

   if (arg[0] === "SetLFGChannel") {
    message.delete();
    let channel = {
     server: message.channel.guild.id,
     channel: message.channel.id
    }
    fs.writeFileSync(path.join(__dirname, "channel.json"), JSON.stringify(channel, null, 2));

   }

   if ((arg[0] === "lfg") && (channel.channel.includes(message.channel.id))) {
    content = message.content.split(" ").slice(1).toString().replace(/,/g, " ")
    mod.send('C_REGISTER_PARTY_INFO', 1, {

     isRaid: 0,

     message: content

    });

   }
  });

  mod.hook('S_SHOW_PARTY_MATCH_INFO', 1, (event) => {
   lfg = event.listings[0].message
 })

  mod.command.add('dlfg', (arg) => {
     const channel = require(__dirname + "\\channel.json");
    gd = bot.guilds.get(channel.server);
    ch = gd.channels.get(channel.channel);
    ch.send("lfg " + lfg);
   });




    bot.on('ready', () => {

     console.log("Connected...")

    });

    if (!fs.existsSync(__dirname + "\\config.json")) {

     console.log("Error at config.json. Re-making the file!\nadd your information then restart the module.")

     fs.writeFileSync(path.join(__dirname, "config.json"), JSON.stringify(default_config, null, 2));

    } else {

     const config = require(__dirname + "\\config.json");

     bot.login(config.token)
      .then(console.log("logged in!"))
      .catch(console.error);

    };
};
