const Handler = require("./handler")

const AlunosSalasModel = require("../Model/AlunosSalasModel");
const alunosSalasModel = new AlunosSalasModel();

// const AlunosNickModel = require("../Model/AlunosNickModel");
// const alunosNickModel = new AlunosNickModel();

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

        this.validations = [
            validationMachine.getValidation("isNotABot"),
            // validationMachine.getValidation("isAdminValidation"),
            // validationMachine.getValidation("isAtChannel", ["testes"]),
            validationMachine.getValidation("notHasRole",alunoclasses),
            validationMachine.getValidation("triesGreaterThan", word,0),
            validationMachine.getValidation("triesLesserThan", word,3),
            validationMachine.getValidation("executionStatusEqualsTo", word, "answer")
        ]
        this.messageToSend = messageToSend;
         this.init();   
    }

    async init(){
        await alunosSalasModel.loadInfo();
        // await alunosNickModel.loadAlunos();
    }

    getName(){
        return "AnswerRoleHandler"
    }

    _giveRole(message, sala){

        let roleName = `atividade-${sala.toLowerCase()}`
        var alunoRole= message.guild.roles.cache.find(role => role.name === "Aluno");
        var role= message.guild.roles.cache.find(role => role.name === roleName);

        if(role){
            message.member.roles.add(alunoRole);
            message.member.roles.add(role);
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
        let hasAdded = this._giveRole(message, aluno.sala);

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

