const Validation = require("./validation")

class containsWord extends Validation {
    constructor(wordToMatch){
        this.wordToMatch = wordToMatch;
    }
    check(data){
        let message = data
        let validation = message.content.contains(this.wordToMatch);
        console.log(`Validating: containsWord: ${validation}`);
        return validation;
    }
}

module.exports = containsWord;