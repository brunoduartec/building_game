const Handler = require("./handler")

const ValidationMachine = require("../validations/validationMachine");
const validationMachine = new ValidationMachine();

class DontKnowHandler extends Handler{
    constructor(word, messageToSend){
        super(word);

        this.validations = [
            validationMachine.getValidation("isNotABot"),
            validationMachine.getValidation("wasMentioned")
        ]

        this.messageToSend = messageToSend
    }
    
    getName(){
        return "DontKnowHandler"
    }

    async method(data){
        const message = data;
        let authorID = message.author.id
        await message.channel.send(`Oi, <@${authorID}> ${this.messageToSend}`);
    }
}

module.exports = DontKnowHandler

