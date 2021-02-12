const Discord = require("discord.js");
const connectDb = require("./connection");

const MessageHandler = require("./handlers/messageHandler")
const askRoleHandler = require("./handlers/askRoleHandler")
const answerRoleHandler = require("./handlers/answerRoleHandler")
const excededRoleHandler = require("./handlers/excededRoleHandler");
const teachMessageHandler = require("./handlers/teachMessageHandler");
const forgetMessageHandler = require("./handlers/forgetMessageHandler");
const TrainingMessageHandler = require("./handlers/trainingMessageHandler");
const DontKnowHandler = require("./handlers/dontKnowHandler");
const sayHiHandler = require("./handlers/sayHiHandler");



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
  dbConnect();
});

function initHandlers(){
  botHandler.addHandler(new MessageHandler("grupo","Vou ver aqui se voce esta nesse grupo"));
  botHandler.addHandler(new MessageHandler("ping","pong"));
  botHandler.addHandler(new askRoleHandler("regra","Você pode digitar seu nome completo pra eu te procurar aqui por favor?"));
  botHandler.addHandler(new answerRoleHandler("regra","Vi aqui que você está na sala "));
  botHandler.addHandler(new excededRoleHandler("regra", "Faz assim, manda uma mensagem lá no grupo estou-perdido que o pessoal da transmissão vai te ajudar."));
  botHandler.addHandler(new teachMessageHandler("aprender", "Acabei de aprender, agora é só me mencionar e mandar ", botHandler));
  botHandler.addHandler(new forgetMessageHandler("esquecer", "Acabei de esquecer", botHandler));
  botHandler.addHandler(new TrainingMessageHandler("treinar", "Beleza, vamos treinar então", botHandler))
  botHandler.addHandler(new DontKnowHandler("dont", "Vixi, eu não sei isso não, acho melhor perguntar pro seu dirigente"))
  botHandler.addHandler(new sayHiHandler("hi", "Olá, que bom ter você por aqui, se precisar de alguma coisa é só me citar que a gente conversa"))

}

function initValidations(){
  const isNotABot = require("./validations/isNotABot");
  const isAdminValidation = require("./validations/isAdminValidation");
  const isAtChannel = require("./validations/isAtChannel");
  const containsWord = require("./validations/containsWord");
  const hasRole = require("./validations/hasRole");
  const notHasRole = require("./validations/notHasRole");
  const wasMentioned = require("./validations/wasMentioned");
  const triesLesserThan = require("./validations/triesLesserThan");
  const triesGreaterThan = require("./validations/triesGreaterThan");
  const triesEqualsTo = require("./validations/triesEqualsTo");
  const executionStatusDifferentThan = require("./validations/executionStatusDifferentThan");
  const executionStatusEqualsTo = require("./validations/executionStatusEqualsTo")

  validationMachine.addValidation("isNotABot", isNotABot);
  validationMachine.addValidation("isAdminValidation", isAdminValidation);
  validationMachine.addValidation("containsWord", containsWord);
  validationMachine.addValidation("isAtChannel", isAtChannel);
  validationMachine.addValidation("hasRole", hasRole);
  validationMachine.addValidation("notHasRole", notHasRole);
  validationMachine.addValidation("wasMentioned", wasMentioned);
  validationMachine.addValidation("triesLesserThan", triesLesserThan);
  validationMachine.addValidation("triesGreaterThan", triesGreaterThan);
  validationMachine.addValidation("triesEqualsTo", triesEqualsTo);
  validationMachine.addValidation("executionStatusDifferentThan", executionStatusDifferentThan);
  validationMachine.addValidation("executionStatusEqualsTo", executionStatusEqualsTo);
  
}


client.on("message", (message) => {
  console.log("-------------------Chegou mensagem------------------------ ", message.content, message.author)
  botHandler.handle(message, client);
});

client.login(botInfo.token);

function addResponses(){
    const ResponseModel = require("./Model/ResponsesModel");
    ResponseModel.find()
    .then(responses => {
      responses.forEach(r => {
        botHandler.addHandler(new MessageHandler(r.word,r.response));
      });
    })
}


function dbConnect(){
  connectDb(addResponses)
}