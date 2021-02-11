const Handler = require("./handler")
const ValidationMachine = require("../validations/validationMachine");
const ResponseModel = require("../Model/ResponsesModel");

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

        let word = message.content.split(" ")[2];

        ResponseModel
          .findOneAndDelete({"word": word})
          .then(result => {
            this.botHandler.removeHandler(word);

            console.log("00000", result)

            message.channel.send(`Oi <@${message.author.id}> ${this.messageToSend} ${result.word} que tinha a resposta: ${result.response}`);
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