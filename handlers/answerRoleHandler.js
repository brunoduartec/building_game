const Handler = require("./handler")

const AlunosSalasModel = require("../Model/AlunosSalasModel");
const alunosSalasModel = new AlunosSalasModel();

const ParticipanteModel = require("../Model/ParticipanteModel");

const HandlerExecutionsModel = require("../Model/HandlerExecutionsModel");
const handlerExecutionModel = new HandlerExecutionsModel();

const ValidationMachine = require("../validations/validationMachine");
const validationMachine = new ValidationMachine();

class AnswerRoleHandler extends Handler{
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
            validationMachine.getValidation("triesGreaterThan", word,0),
            validationMachine.getValidation("triesLesserThan", word,2),
            validationMachine.getValidation("executionStatusEqualsTo", word, "answer")
        ]
        this.messageToSend = messageToSend;
         this.init();   
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

    async init(){
        await alunosSalasModel.loadInfo();
        // await alunosNickModel.loadAlunos();
    }

    getName(){
        return "AnswerRoleHandler"
    }

    _saveToDB(name, nick){
        const newQuestion = new ParticipanteModel({
            name: nome,
            nick: nick,
            helped: true,
            interacted: true
          });

          newQuestion
          .save()
          .then(result => {
            console.log(`Ajudou-----: ${name}`)
          })
          .catch(error => {
            console.log("Error---", error)
          });
    }

    _giveRole(message, aluno){

        let roleName = `atividade-${aluno.sala.toLowerCase()}`
        var alunoRole= message.guild.roles.cache.find(role => role.name === "Aluno");
        var role= message.guild.roles.cache.find(role => role.name === roleName);

        if(role){
            message.member.roles.add(alunoRole);
            message.member.roles.add(role);
            this._saveToDB(aluno.nome, message.author.username);
            return true;
        }
        else{
            return false;
        }
    }

    getAlunosInfo(nick){
        let alunoNick = alunosNickModel.getNameByNick(nick);
        if(alunoNick){
            let name = alunoNick.nome;
            let alunoSalaInfo = alunosSalasModel.getAlunoByName(name)
            
            let aluno = {
                "nome": name,
                "sala": alunoSalaInfo.sala,
                "crachá": alunoSalaInfo.cracha
            }
    
            return aluno;
        }
        else{
            return null;
        }
    }

    getAlunoInfoByMessage(message){
        let alunoSalaInfo = alunosSalasModel.findAlunoInAMessage(message);
        return alunoSalaInfo;  
    }

    finalizeGiveRole(message, aluno){
        message.channel.send(`${this.messageToSend}: ${aluno.sala}` );
        let hasAdded = this._giveRole(message, aluno);

        if(hasAdded){
            message.channel.send("Ela já deve ter aparecido ali à esquerda" );
            handlerExecutionModel.removeHandlerExecution(this.word, message.author.id);
        }
        else{
            message.channel.send(`Não consegui adicionar você na sala atividade-${aluno.sala.toLowerCase()}` );
        }
    }

    async tryGiveRole(message){
        let aluno = this.getAlunoInfoByMessage(message.content);
        if(aluno){
            this.finalizeGiveRole(message,aluno);
            handlerExecutionModel.removeHandlerExecution(this.word, message.author.id);
        }
        else{
            handlerExecutionModel.incHandlerExecutionTries(this.word, message.author.id);

            console.log("Tentativas----", handlerExecutionModel.getHandlerExecution(this.word, message.author.id).tries)
            // handlerExecutionModel.updateHandlerExecutionStatus(this.word, message.author.id, "answer");
            await message.channel.send("Você pode digitar seu nome completo pra eu te procurar aqui por favor?");
        }
    }

    async method(data){

        console.log("----ANSWER----")
        const message = data;
        await message.channel.send(`Oi, <@${message.author.id}>`)
        
        this.tryGiveRole(message);

    }
}

module.exports = AnswerRoleHandler

