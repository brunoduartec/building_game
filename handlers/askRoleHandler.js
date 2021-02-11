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

        let noRoles = alunoclasses.concat(this.getNoRoles())

        this.validations = [
            validationMachine.getValidation("isNotABot"),
            validationMachine.getValidation("notHasRole",noRoles),
            validationMachine.getValidation("triesLesserThan", word,1),
            validationMachine.getValidation("executionStatusDifferentThan", word, "answer")
        ]

        this.messageToSend = messageToSend
    }

    getNoRoles(){
        let noRoles = [];
        
        noRoles.push("Transmissão"),
        noRoles.push("Só quero te Ouvir"),
        noRoles.push("Artes"),
        noRoles.push("Câmara de sustentação"),
        noRoles.push("Engajamento"),
        noRoles.push("Família"),
        noRoles.push("Fórum dos Trabalhadores"),
        noRoles.push("Envolvimento"),
        noRoles.push("Integração"),
        noRoles.push("Voluntários")
        return noRoles;
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

