const Validation = require("./validation")

class isNotABot extends Validation {
    check(data){
        let message = data
        let validation = message.author.bot;
        return !validation;
    }
}

module.exports = isNotABot;