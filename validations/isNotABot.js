const Validation = require("./validation")

class isNotABot extends Validation {
    check(data){
        let message = data
        let validation = message.author.bot;
        console.log(`Validating: isNotABot: ${validation}`);
        return !validation;
    }
}

module.exports = isNotABot;