const Handler = require("./handler")

class MessageHandler extends Handler{
    constructor(messageToSend){
        super();

        this.validations = [
            "isABot",
            "isAdminValidation"
        ]
        this.messageToSend = messageToSend;
    }
    method(data){
        const message = data;
        message.channel.send(this.messageToSend);
    }
}

module.exports = MessageHandler