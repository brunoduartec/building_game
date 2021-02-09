const Validation = require("./validation")
const HandlerExecutionsModel = require("../Model/HandlerExecutionsModel");

class triesEqualsTo extends Validation {
    constructor(handleName, amounts){
        super();
        this.handlerExecutions = new HandlerExecutionsModel();

        this.handleName = handleName;
        this.amounts = amounts;
    }
    check(data){
        let message = data
        let userID = message.author.id;
        let validation = false;


        
        let handlerExecution = this.handlerExecutions.getHandlerExecution(this.handleName, userID);
        console.log("--------CHECANDO IGUAL-----")
        if(handlerExecution){
            console.log(handlerExecution.tries)
            validation = handlerExecution.tries == this.amounts;
        }
        else{
            this.handlerExecutions.addHandlerExecution(this.handleName, userID, "ask");
            validation = true;
        }

        return validation;
    }
}

module.exports = triesEqualsTo;