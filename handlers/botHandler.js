const env = require("../env.json")
const botInfo = env.discord.bot

class botHandler{
    constructor(){
        this.handlers = [];
    }
    addHandler(handler){
        this.handlers.push(handler);
    }

    getHandlers(){
        return this.handlers;
    }

    showKnowledge(message){
        let messageToSend = "Eu sei falar sobre: \n";

        this.handlers.forEach(handler => {
            messageToSend+= `${handler.getName()} \n`
        });
        message.channel.send(messageToSend);
    }

    handle(data, client){
        let solved = false;

        for (let index = 0; index < this.handlers.length; index++) {
            const handler = this.handlers[index];

            let test = handler.check(data, client);
            if(test){
                handler.method(data);
                solved = true;
                break;
            }
        }

    }
}

module.exports = botHandler