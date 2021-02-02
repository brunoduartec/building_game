const env = require("../env.json")
const botInfo = env.discord.bot

class botHandler{
    constructor(){
        this.handlers = {};
    }
    addHandler(word, handler){
        this.handlers[word] = handler;
        console.log(`Added handler ${word}`, this.handlers[word])
    }

    getHandlers(){
        return this.handlers;
    }

    showKnowledge(message, keys){
        let messageToSend = "Eu sei falar sobre: \n";

        keys.forEach(word => {
            messageToSend+= `${word} \n`
        });
        message.channel.send(messageToSend);
    }

    handle(message){
        const keys = Object.keys(this.handlers);
        let solved = false;
        keys.every(word => {
            if(message.content.includes(word)){
                console.log(`Testando ${word}`)
                if(this.handlers[word].check(message)){
                    this.handlers[word].method(message);
                    solved = true;
                    return true;
                }
            }
        });

        if(!solved){
            this.showKnowledge(message, keys);
        }

    }
}

module.exports = botHandler