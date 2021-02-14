const Handler = require("./handler")

const VoluntarioSalasModel = require("../Model/VoluntarioSalasModel");
const voluntarioSalasModel = new VoluntarioSalasModel();

const HandlerExecutionsModel = require("../Model/HandlerExecutionsModel");
const handlerExecutionModel = new HandlerExecutionsModel();

const RoleManagement = require("../roleManagement")
const roleManagement = new RoleManagement();

const ValidationMachine = require("../validations/validationMachine");
const validationMachine = new ValidationMachine();

class AnswerForumHandler extends Handler{
    constructor(word, messageToSend){
        super(word);

        this.validations = [
            validationMachine.getValidation("isNotABot"),
            validationMachine.getValidation("isAtChannel", ["recepcao-egm-🙋"]),
            validationMachine.getValidation("hasRole",roleManagement.getWorkersRoles()),
            validationMachine.getValidation("triesGreaterThan", word,0),
            validationMachine.getValidation("triesLesserThan", word,2),
            validationMachine.getValidation("executionStatusEqualsTo", word, "answer")
        ]
        this.messageToSend = messageToSend;
        this.init(); 
    }

    async init(){
        await voluntarioSalasModel.loadInfo();
    }

    getName(){
        return "AnswerForumHandler"
    }

    getVoluntarioInfoByMessage(message){
        let voluntarioSalaInfo = voluntarioSalasModel.findVoluntarioInAMessage(message);
        return voluntarioSalaInfo;  
    }

    finalizeGiveRole(message, voluntario){
        message.channel.send(`${this.messageToSend}: ${voluntario.sala}` );

        let roleName = `forum-${voluntario.sala}`
        let hasAdded = roleManagement.giveRole(message, voluntario.nome, roleName, false)

        if(hasAdded){
            message.channel.send("Ela já deve ter aparecido ali à esquerda" );
            handlerExecutionModel.removeHandlerExecution(this.word, message.author.id);
        }
        else{
            message.channel.send(`Não consegui adicionar você na sala atividade-${voluntario.sala.toLowerCase()}` );
        }
    }

    async tryGiveRole(message){
        let voluntario = this.getVoluntarioInfoByMessage(message.content);
        if(voluntario){
            this.finalizeGiveRole(message,voluntario);
            handlerExecutionModel.removeHandlerExecution(this.word, message.author.id);
        }
        else{
            handlerExecutionModel.incHandlerExecutionTries(this.word, message.author.id);

            let handlerExecution = handlerExecutionModel.getHandlerExecution(this.word, message.author.id)

            if(handlerExecution.tries == 1){
                await message.channel.send("Você pode digitar seu nome completo pra eu te procurar aqui por favor?");
            }
            else{
                await message.channel.send("Eu não te encontrei aqui ainda, vamos fazer o seguinte.");
                await message.channel.send("Pode ser que você se inscreveu como trabalhador e aí eu não tenho a lista aqui");
                await message.channel.send("Procura manda uma mensagem lá no estou-perdido que o pessoal da transmissão vai te ajudar");
            }
            handlerExecutionModel.updateHandlerExecutionStatus(this.word, message.author.id, "answer");
        }
    }

    async method(data){
        const message = data;
        await message.channel.send(`Oi, <@${message.author.id}>`)
        
        this.tryGiveRole(message);

    }
}

module.exports = AnswerForumHandler

