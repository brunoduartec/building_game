const Handler = require("./handler")

const HandlerExecutionsModel = require("../Model/HandlerExecutionsModel");
const handlerExecutionModel = new HandlerExecutionsModel();

const ValidationMachine = require("../validations/validationMachine");
const validationMachine = new ValidationMachine();

class ExcededRoleHandler extends Handler{
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
            validationMachine.getValidation("notHasRole",alunoclasses),
            validationMachine.getValidation("notHasRole",this.getNoRoles()),
            validationMachine.getValidation("triesEqualsTo", word,3),
            validationMachine.getValidation("executionStatusEqualsTo", word, "answer")
        ]
        this.messageToSend = messageToSend;
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
        return "ExcededRoleHandler"
    }

    async method(data){

        console.log("----Excedeu----")
        const message = data;
        await message.channel.send(`Oi, <@${message.author.id}>`)
        await message.channel.send(this.messageToSend);
        handlerExecutionModel.removeHandlerExecution(this.word, message.author.id);
    }
}

module.exports = ExcededRoleHandler

