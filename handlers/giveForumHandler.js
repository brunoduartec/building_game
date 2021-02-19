const Handler = require("./handler")

const HandlerExecutionsModel = require("../Model/HandlerExecutionsModel");
const handlerExecutionModel = new HandlerExecutionsModel();

const ValidationMachine = require("../validations/validationMachine");
const validationMachine = new ValidationMachine();

const AlunosNickModel = require("../Model/AlunosNickModel");
const alunosNickModel = new AlunosNickModel();

const RoleManagement = require("../roleManagement")
const roleManagement = new RoleManagement();

class GiveForumHandle extends Handler{
    constructor(word, messageToSend){
        super(word);

        this.validations = [
            validationMachine.getValidation("isNotABot"),
            validationMachine.getValidation("isAtChannel", ["recepcao-egm-🙋"]),
            validationMachine.getValidation("containsWord", this.word),
            validationMachine.getValidation("hasRole",roleManagement.getWorkersRoles()),
            validationMachine.getValidation("notHasRole",roleManagement.getForumRoles()),
            validationMachine.getValidation("triesLesserThan", word,1),
            validationMachine.getValidation("executionStatusDifferentThan", word, "answer")
        ]

        this.messageToSend = messageToSend
        this.init();
    }

    async init(){
        await alunosNickModel.loadAlunos();
    }

    getName(){
        return "GiveForumHandle"
    }

    async method(data){
        const message = data;
        let authorID = message.author.id
        await message.channel.send(`Oi, <@${authorID}>`);

        await message.channel.send(this.messageToSend);
        handlerExecutionModel.incHandlerExecutionTries(this.word, authorID);
        handlerExecutionModel.updateHandlerExecutionStatus(this.word, authorID, "answer");
    }
}

module.exports = GiveForumHandle

