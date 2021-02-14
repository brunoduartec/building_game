const Handler = require("./handler")

const HandlerExecutionsModel = require("../Model/HandlerExecutionsModel");
const handlerExecutionModel = new HandlerExecutionsModel();

const ValidationMachine = require("../validations/validationMachine");
const validationMachine = new ValidationMachine();

const AlunosNickModel = require("../Model/AlunosNickModel");
const alunosNickModel = new AlunosNickModel();

const AlunosSalasModel = require("../Model/AlunosSalasModel");
const alunosSalasModel = new AlunosSalasModel();

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
            validationMachine.getValidation("isAtChannel", ["recepcao-egm-🙋"]),
            validationMachine.getValidation("notHasRole",noRoles),
            validationMachine.getValidation("triesLesserThan", word,1),
            validationMachine.getValidation("executionStatusDifferentThan", word, "answer")
        ]

        this.messageToSend = messageToSend
        this.init();
    }

    async init(){
        await alunosNickModel.loadAlunos();
        await alunosSalasModel.loadInfo();
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

    _tryGiveRole(message){
        let nick = message.author.username;
        let name = alunosNickModel.getNameByNick(nick);
        let aluno = alunosSalasModel.getAlunoByName(name);

        console.log("----------------------TENTANDO--------------------", aluno);

        if(aluno){
            console.log("----------ACHEI JA O NOME---------------")
            let roleName = `atividade-${aluno.sala.toLowerCase()}`
            let hasAdded = roleManagement.giveRole(message,name, roleName, true);

            if(hasAdded){
                handlerExecutionModel.removeHandlerExecution(this.word, message.author.id);
                return aluno;
            }else{
                return null;
            }
        }
        else{
            return null;
        }
    }

    async method(data){
        const message = data;
        let authorID = message.author.id
        await message.channel.send(`Oi, <@${authorID}>`);

        let fastAdd = this._tryGiveRole(message);

        if(fastAdd){
            message.channel.send("Te encontrei aqui na minha lista 😊" );
            message.channel.send(`Vi que você está na sala atividade-${fastAdd.sala.toLowerCase()}`);
            message.channel.send("Ela já deve ter aparecido ali à esquerda" );
        }
        else{
            await message.channel.send(this.messageToSend);
            handlerExecutionModel.incHandlerExecutionTries(this.word, authorID);
            handlerExecutionModel.updateHandlerExecutionStatus(this.word, authorID, "answer");
        }

    }
}

module.exports = AskRoleHandler

