const Handler = require("./handler")

const HandlerExecutionsModel = require("../Model/HandlerExecutionsModel");
const handlerExecutionModel = new HandlerExecutionsModel();

const ValidationMachine = require("../validations/validationMachine");
const validationMachine = new ValidationMachine();


class SayHiHandler extends Handler{
    constructor(word, messageToSend){
        super(word);

        this.validations = [
            validationMachine.getValidation("isNotABot"),
            validationMachine.getValidation("isAtChannel", ["recepcao-egm-🙋"]),
            validationMachine.getValidation("hasRole",this._getRoles()),
            validationMachine.getValidation("triesLesserThan", word,1)
        ]

        this.messageToSend = messageToSend
    }

    _getRoles(){
        let roles = [];
        
        roles.push("Transmissão"),
        roles.push("Só quero te Ouvir"),
        roles.push("Artes"),
        roles.push("Câmara de sustentação"),
        roles.push("Engajamento"),
        roles.push("Família"),
        roles.push("Fórum dos Trabalhadores"),
        roles.push("Envolvimento"),
        roles.push("Integração"),
        roles.push("Voluntários")
        return roles;
    }

    
    getName(){
        return "SayHiHandler"
    }

    async method(data){
        const message = data;
        let authorID = message.author.id
        await message.channel.send(`Oi, <@${authorID}> ${this.messageToSend}`);
        handlerExecutionModel.incHandlerExecutionTries(this.word, authorID);
    }
}

module.exports = SayHiHandler

