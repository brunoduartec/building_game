const env = require("../env.json")
const botInfo = env.discord.bot

class botHandler{
    constructor(){
        this.handlers = [];
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

        let validHandlers = this.handlers.filter(h=> h.word != "dont")
        let dontKnow = this.getHandlerByWord("dont")

        for (let index = 0; index < validHandlers.length; index++) {
            const handler = validHandlers[index];
            solved = this.tryHandle(handler,data, client);
            if(solved)
            {
                break;
            }
        }

        if(!solved){
            console.log("==============VAI RESOLVER O UNKNOWN===============")
            // console.log(this.dontKnowHandler)
            this.tryHandle(dontKnow,data, client)
            return;
        }

    }
}

module.exports = botHandler