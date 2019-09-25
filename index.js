module.exports = function LFGer(mod) {


 const Discord = require("discord.js");
 const bot = new Discord.Client();
 const fs = require("fs");
 const path = require("path");
 var default_token = {
  token: "bot/user token here"
 };


 bot.on('message', message => {

  var arg = message.content.split(" ");
  var command = message.content.split(" ").slice(0, 2).toString().replace(/,/g, " ");

  let arr = []

  Blacklist = /WTB|WTS|SELL|BUY|Map|Spot|Naslow|SMART|AFK|SH|CS|wtb|wts|Artifact|waiting|room|Wts|Wtb|Twitch|twitch/;

  if (command === "lfg list") {
   openlfg()
   var start = Date.now();
   var lfgmsg = "\n";
   var lfgleader = "\n";
   var lfgnb = "\n";
   mod.hookOnce('S_SHOW_PARTY_MATCH_INFO', 1, (event) => {
    lfglist = event.listings
    lfglist.forEach(lfg => {
     msg = lfg.message
     if (Blacklist.test(msg) === false) {
      if (lfg.isRaid === 1) {
       lfgmsg += "🎌 " + lfg.message + "\n \n";
      } else {
       lfgmsg += lfg.message + "\n \n";
      }
      lfgleader += lfg.leader + "\n \n";
      lfgnb += lfg.playerCount + "\n \n"
     }
    })
    PC = event.pageCurrent + 1
    CUR = event.pageCount + 1
    const LFG = new Discord.RichEmbed()
     .setColor('#13447C')
     .addField('**Goal**', "­­⠀" + lfgmsg + " ", true)
     .addField('**Party Leader**', "⠀" + lfgleader + " ", true)
     .addField('**Member**', "⠀" + lfgnb + " ", true)
     .setTimestamp(message.createdAt)
     .setFooter(PC + " / " + CUR+"\t●\tFetched in: " + Math.floor((Date.now() - start) / 1000) + " Seconds");
    message.channel.send(LFG)
   })
  };

 });

 function page(nb) {
  mod.send('C_REQUEST_PARTY_MATCH_INFO_PAGE', 1, (page) => {
   page.page = nb
  })
 }

 function openlfg() {

  mod.send('C_REQUEST_PARTY_MATCH_INFO', 1, {

   unk1: 0,

   minlvl: 65,

   maxlvl: 70,

   unk2: 3,

   unk3: 0,

   purpose: ''

  })

  mod.send('C_REQUEST_PARTY_MATCH_INFO', 1, {

   unk1: 0,

   minlvl: 65,

   maxlvl: 70,

   unk2: 3,

   unk3: 0,

   purpose: ''

  })

 }

 bot.on('ready', () => {

  console.log("Connected...")

 });

 if (!fs.existsSync(__dirname + "\\config.json")) {

  console.log("Error at config.json. Re-making the file!\nadd your information then restart the module.")

  fs.writeFileSync(path.join(__dirname, "config.json"), JSON.stringify(default_token, null, 2));

 } else {

  const config = require(__dirname + "\\config.json");

  bot.login(config.token)
   .then(console.log("logged in!"))
   .catch(console.error);

 };
};
