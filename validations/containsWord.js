const Validation = require("./validation")

class containsWord extends Validation {
    constructor(wordToMatch){
        super();
        this.wordToMatch = wordToMatch;

        console.log("----CRIOU UM CONTAINSWORD", this.wordToMatch)
    }
    check(data){
        let message = data

        console.log("----CONTAINS WORD----", message.content)
        let validation = message.content.includes(this.wordToMatch);
        console.log(`Validating: containsWord: ${validation}`);
        return validation;
    }
}

module.exports = containsWord;