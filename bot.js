const Discord = require("discord.js");

const MessageHandler = require("./handlers/messageHandler")
const RoleHandler = require("./handlers/roleHandler")

const BotHandler = require("./handlers/botHandler")
const botHandler = new BotHandler();

const client = new Discord.Client();

const ValidationMachine = require("./validations/validationMachine")
const validationMachine = new ValidationMachine();


const env = require("./env.json")
const botInfo = env.discord.bot
// Set the prefix
const prefix = botInfo.prefix;


client.on("ready", () => {
  console.log("I am ready!");
  initValidations();
  initHandlers();
});

function initHandlers(){
  botHandler.addHandler(new MessageHandler("grupo","Vou ver aqui se voce esta nesse grupo"));
  botHandler.addHandler(new MessageHandler("ping","pong"));
  botHandler.addHandler(new RoleHandler("regra","Vi aqui que você está na sala "));
}

function initValidations(){
  const isNotABot = require("./validations/isNotABot");
  const isAdminValidation = require("./validations/isAdminValidation");
  const isAtChannel = require("./validations/isAtChannel");
  const containsWord = require("./validations/containsWord");
  const hasRole = require("./validations/hasRole");
  const notHasRole = require("./validations/notHasRole");
  const wasMentioned = require("./validations/wasMentioned");

  validationMachine.addValidation("isNotABot", isNotABot);
  validationMachine.addValidation("isAdminValidation", isAdminValidation);
  validationMachine.addValidation("containsWord", containsWord);
  validationMachine.addValidation("isAtChannel", isAtChannel);
  validationMachine.addValidation("hasRole", hasRole);
  validationMachine.addValidation("notHasRole", notHasRole);
  validationMachine.addValidation("wasMentioned", wasMentioned);
}


client.on("message", (message) => {
  console.log("-----Chegou mensagem ", message.content, client.user.id)
  botHandler.handle(message, client);
});

client.login(botInfo.token);