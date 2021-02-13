const Handler = require("./handler")

const HandlerExecutionsModel = require("../Model/HandlerExecutionsModel");
const handlerExecutionModel = new HandlerExecutionsModel();

const ParticipanteModel = require("../Model/ParticipanteModel");

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

        let noRoles = alunoclasses.concat(this.getNoRoles())

        this.validations = [
            validationMachine.getValidation("isNotABot"),
            validationMachine.getValidation("notHasRole",noRoles),
            validationMachine.getValidation("triesEqualsTo", word,2),
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
 
    _saveToDB(nick){
        const newQuestion = new ParticipanteModel({
            name: "",
            nick: nick,
            helped: false,
            interacted: true
          });

          newQuestion
          .save()
          .then(result => {
            console.log(`Não ajudou-----: ${name}`)
          })
          .catch(error => {
            console.log("Error---", error)
          });
    }

    getName(){
        return "ExcededRoleHandler"
    }

    async method(data){
        console.log("----Excedeu----")
        const message = data;
        await message.channel.send(`Oi, <@${message.author.id}>`)
        await message.channel.send(this.messageToSend);
        this._saveToDB(message.author.username)

    }
}

module.exports = ExcededRoleHandler

