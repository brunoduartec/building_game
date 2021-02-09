const Handler = require("./handler")

const HandlerExecutionsModel = require("../Model/HandlerExecutionsModel");
const handlerExecutionModel = new HandlerExecutionsModel();

const ValidationMachine = require("../validations/validationMachine");
const validationMachine = new ValidationMachine();


class AskRoleHandler extends Handler{
    constructor(word, messageToSend){
        super(word);

        let alunoclasses = [];

        let currentLetter = "a"
        
        for (let index = 0; index < 25; index++) {
            alunoclasses.push(`atividade-${currentLetter}`);
            currentLetter = String.fromCharCode(currentLetter.charCodeAt() + 1);
        }

        this.validations = [
            validationMachine.getValidation("isNotABot"),
            validationMachine.getValidation("isAdminValidation"),
            // validationMachine.getValidation("isAtChannel", ["testes"]),
            validationMachine.getValidation("notHasRole",alunoclasses),
            validationMachine.getValidation("triesLesserThan", word,1),
            validationMachine.getValidation("executionStatusDifferentThan", word, "answer")
        ]

        this.messageToSend = messageToSend
    }
    getName(){
        return "AskRoleHandler"
    }

    async method(data){

        console.log("----ASK----")

        const message = data;
        let authorID = message.author.id
        await message.channel.send(`Oi, <@${authorID}>`);
        await message.channel.send(this.messageToSend);
        handlerExecutionModel.incHandlerExecutionTries(this.word, authorID);
        handlerExecutionModel.updateHandlerExecutionStatus(this.word, authorID, "answer");
    }
}

module.exports = AskRoleHandler

