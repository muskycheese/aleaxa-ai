const { Client } = require("discord.js");
const client = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"],
  partials: ["CHANNEL"],
});
const smartestchatbot = require("smartestchatbot");
const scb = new smartestchatbot.Client();
client.on("ready", () => {
  console.log("Ready for chatting!| Bot by 0_0");
});
client.on("messageCreate", async (message) => {
  // when client detects a message
  if (message.author.bot) return; // if the author of the message is a bot ignore the case
  message.content = message.content
    .replace(/@(everyone)/gi, "everyone")
    .replace(/@(here)/gi, "here");
  if (message.content.includes(`@`)) {
    return message.reply({
      content: `**:x: Please dont mention anyone while talking to me I feel attacked 😭**`,
    });
  }
  if (!message.content)
    return message.reply({
      content: "Please say something.",
      allowedMentions: { repliedUser: true },
    });
  scb
    .chat(
      {
        message: message.content,
        name: client.user.username,
        master: "Zero",
        user: message.author.id,
      },
      "en"
    )
    .then((reply) => {
      message.reply({ content: reply, allowedMentions: { repliedUser: true } });
    });
});
client.login(process.env.TOKEN); //login using the token
