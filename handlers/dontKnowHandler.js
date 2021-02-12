const Handler = require("./handler")

const ValidationMachine = require("../validations/validationMachine");
const validationMachine = new ValidationMachine();

const DontKnowResponses = require("../Model/DontKnowResponses");

class DontKnowHandler extends Handler{
    constructor(word,messageToSend){
        super(word);

        this.validations = [
            validationMachine.getValidation("isNotABot"),
            validationMachine.getValidation("wasMentioned")
        ]
        this.messageToSend = messageToSend;
    }
    
    getName(){
        return "DontKnowHandler"
    }

    _sendSentence(authorID, message){
        console.log("------send sentence---")

        DontKnowResponses.find()
        .then(responses => {
            let length = responses.length;

            console.log(responses)
            console.log("-----DontKnow-----", length);

            if(length>0){
                let index = Math.floor(Math.random() * length);
                message.channel.send(`Oi, <@${authorID}> ${responses[index].response}`);
            }
            else{
                message.channel.send(`Oi, <@${authorID}> ${this.messageToSend}`);
            }
        })
    }

    async method(data){
        const message = data;
        let authorID = message.author.id
        this._sendSentence(authorID, message);
        
    }
}

module.exports = DontKnowHandler

