const Validation = require("./validation")

class containsWord extends Validation {
    constructor(wordToMatch){
        super();
        this.wordToMatch = wordToMatch;
    }
    check(data){
        let message = data
        let validation = message.content.toLowerCase().includes(this.wordToMatch);
        return validation;
    }
}

module.exports = containsWord;