const Validation = require("./validation")

class isAtChannel extends Validation {
    constructor(channel){
        super();
        this.channels = channel;
    }
    check(data){
        let message = data
        let channelName = message.channel.name;
        let validation = false;

        for (let index = 0; index < this.channels.length; index++) {
            if(this.channels.find(element => element == channelName))
            {
                validation = true;
                break;
            }
        }
        console.log(`Validating: isAtChannel: ${validation}`);
        return validation;
    }
}

module.exports = isAtChannel;