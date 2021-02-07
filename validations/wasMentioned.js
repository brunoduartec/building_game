const Validation = require("./validation")

class wasMentioned extends Validation {
    check(data, client){
        let message = data
        let validation = message.mentions.has(client.user)

        console.log(`Validating: wasMentioned: ${validation}`);
        return validation;
    }
}

module.exports = wasMentioned;