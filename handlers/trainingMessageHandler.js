const Handler = require("./handler")
const ValidationMachine = require("../validations/validationMachine");
const ResponseModel = require("../Model/ResponsesModel");


//Arrumar isso
const MessageHandler = require("./messageHandler")

const validationMachine = new ValidationMachine();

class TrainingMessageHandler extends Handler{
    constructor(word,messageToSend, botHandler){
        super(word);

        this.validations = [
            validationMachine.getValidation("isAdminValidation"),
            validationMachine.getValidation("containsWord", this.word),
            validationMachine.getValidation("isNotABot"),
            validationMachine.getValidation("isAtChannel", ["testes"]),
            validationMachine.getValidation("wasMentioned")
        ]

        this.botHandler = botHandler
        this.messageToSend = messageToSend;
    }
    method(data){
        const message = data;

        console.log("-------------ENTROU----------")

        ResponseModel.find()
        .then(responses => {

          console.log("----PEGOU TUDO-----", responses)

          let found = false;
          responses.forEach(r => {
            let tryGet = this.botHandler.getHandlerByWord(r.word);
            
            if(!tryGet){
              found = true;
              console.log("------ACHOU O HANDLER")
              this.botHandler.addHandler(new MessageHandler(r.word,r.response));
              message.channel.send(`Acabei de adicionar aqui ${r.word}:${r.response}`);
            }
          });

          if(!found){
            message.channel.send(` <@${message.author.id}> eu já sabia tudo`);
          }

        })
    }
    getName(){
        return "TrainingMessageHandler"
    }
}

module.exports = TrainingMessageHandler