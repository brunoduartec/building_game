class HandlerExecutionsModel{
    constructor(){
        let instance = this.constructor.instance
        if(instance){
            return instance;
        }

        this.constructor.instance = this;
        this.handlerExecutions = {}
    }

    addHandlerExecution(handlerName, userID,status){
        if(!this.handlerExecutions[userID]){
            this.handlerExecutions[userID] = {}
        }
        this.handlerExecutions[userID][handlerName]={
            tries : 0,
            status: status
        }
    }
    removeHandlerExecution(handlerName, userID){
        delete this.handlerExecutions[userID][handlerName]
    }

    incHandlerExecutionTries(handlerName, userID){
        let tries = this.getHandlerExecution(handlerName,userID).tries;
        this.handlerExecutions[userID][handlerName].tries = tries +1;
    }

    updateHandlerExecutionStatus(handleName,userID,status){
        this.handlerExecutions[userID][handleName].status = status;
    }

    getHandlerExecution(handlerName, userID){
        if(this.handlerExecutions[userID]){
            let handlerExecution = this.handlerExecutions[userID][handlerName];
            return handlerExecution;
        }
        else{
            return null;
        }
    }
}

module.exports = HandlerExecutionsModel