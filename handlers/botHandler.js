const env = require("../env.json")
const botInfo = env.discord.bot

class botHandler{
    constructor(){
        this.handlers = [];
        const DontKnowHandler = require("./dontKnowHandler");
        this.dontKnowHandler = new DontKnowHandler("dont", "Vixi, eu não sei isso não, acho melhor perguntar pro seu dirigente");
    }
    addHandler(handler){
        this.handlers.push(handler);
    }
    removeHandler(word){
        let filter = m => m.word != word;
        let handlers = this.handlers.filter(filter)
        this.handlers = handlers;
    }

    getHandlers(){
        return this.handlers;
    }

    getHandlerByWord(word){
        let filter = m => m.word == word;
        let handler = this.handlers.find(filter)
        // console.log(this.handlers)
        console.log("-----FIND----", word);
        console.log(handler)
        return handler
    }

    showKnowledge(message){
        let messageToSend = "Eu sei falar sobre: \n";

        this.handlers.forEach(handler => {
            messageToSend+= `${handler.getName()} \n`
        });
        message.channel.send(messageToSend);
    }

    tryHandle(handler, data, client){
        let solved = false;
        let test = handler.check(data, client);
        if(test){
            handler.method(data);
            solved = true;
        }
        return solved
    }

    handle(data, client){
        let solved = false;

        for (let index = 0; index < this.handlers.length; index++) {
            const handler = this.handlers[index];
            solved = this.tryHandle(handler,data, client);
            if(solved)
            {
                break;
            }
        }

        // if(!solved){
        //     console.log(this.dontKnowHandler)
        //     this.tryHandle(this.dontKnowHandler,data, client)
        //     return;
        // }

    }
}

module.exports = botHandler