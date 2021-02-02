const Validation = require("./validation")

class isABot extends Validation {
    check(data){
        let message = data
        let validation = message.author.bot;
        console.log(`Validating: isABot: ${validation}`);
        return validation;
    }
}

module.exports = isABot;