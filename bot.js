const Discord = require("discord.js");

const Permission = require("./permission.js")
const permission = new Permission();

const MessageHandler = require("./handlers/messageHandler")
const RoleHandler = require("./handlers/roleHandler")

const BotHandler = require("./handlers/botHandler")
const botHandler = new BotHandler();

const client = new Discord.Client();

const ValidationMachine = require("./validations/validationMachine")


const env = require("./env.json")
const botInfo = env.discord.bot
// Set the prefix
const prefix = botInfo.prefix;


client.on("ready", () => {
  console.log("I am ready!");
  initHandlers();
  initValidations();
});

function initHandlers(){
  let a = new MessageHandler("Vou ver aqui se voce esta nesse grupo");
  console.log(a.check({
    "content": "banana"
  }));

  botHandler.addHandler("grupo", new MessageHandler("Vou ver aqui se voce esta nesse grupo"));
  botHandler.addHandler("ping", new MessageHandler("pong"));
  botHandler.addHandler("regra", new RoleHandler("Você está nos grupos: "));
}

function initValidations(){
  const isABot = require("./validations/isABot");
  const isAdminValidation = require("./validations/isAdminValidation");

  let validationMachine = new ValidationMachine();
  
  validationMachine.addValidation("isABot", isABot);
  validationMachine.addValidation("isAdminValidation", isAdminValidation);
}


client.on("message", (message) => {
  console.log("-----Chegou mensagem ", message.content)
    botHandler.handle(message);
});

client.login(botInfo.token);