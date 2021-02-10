const Handler = require("./handler")
const ValidationMachine = require("../validations/validationMachine");
const ResponseModel = require("../Model/ResponsesModel");


//Arrumar isso
const MessageHandler = require("./messageHandler")

const validationMachine = new ValidationMachine();

class TeachMessageHandler extends Handler{
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
        let toLearn = message.content.split(":");

        let response = toLearn[1]
        let word = toLearn[0].split(" ").pop();

        const newQuestion = new ResponseModel({
            word: word,
            response: response
          });

          newQuestion
          .save()
          .then(result => {
            this.botHandler.addHandler(new MessageHandler(word,response));
            message.channel.send(`Oi <@${message.author.id}>: ${this.messageToSend}${result.word}`);
          })
          .catch(error => {
            console.log("Error---", error)
          });

    }
    getName(){
        return "TeachMessageHandler"
    }
}

module.exports = TeachMessageHandler