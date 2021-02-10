const Handler = require("./handler")
const ValidationMachine = require("../validations/validationMachine");
const validationMachine = new ValidationMachine();

class MessageHandler extends Handler{
    constructor(word,messageToSend){
        super(word);

        this.validations = [
            validationMachine.getValidation("containsWord", this.word),
            validationMachine.getValidation("isNotABot"),
            validationMachine.getValidation("wasMentioned")
        ]
        this.messageToSend = messageToSend;
    }
    method(data){
        const message = data;

        message.channel.send(`Oi <@${message.author.id}>: ${this.messageToSend}`);
    }
    getName(){
        return "MessageHandler"
    }
}

module.exports = MessageHandler