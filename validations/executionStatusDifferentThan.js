const Validation = require("./validation")
const HandlerExecutionsModel = require("../Model/HandlerExecutionsModel");

class executionStatusDifferentThan extends Validation {
    constructor(handleName, status){
        super();
        this.handlerExecutions = new HandlerExecutionsModel();

        this.handleName = handleName;
        this.status = status;
    }
    check(data){
        let message = data
        let userID = message.author.id;
        let validation = false;

        let handlerExecution = this.handlerExecutions.getHandlerExecution(this.handleName, userID);

        if(handlerExecution){
            validation = handlerExecution.status != this.status;
        }
        else{
            this.handlerExecutions.addHandlerExecution(this.handleName, userID, "ask");
            validation = true;
        }

        return validation;
    }
}

module.exports = executionStatusDifferentThan;