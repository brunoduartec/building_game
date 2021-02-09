let ValidationMachine = require("../validations/validationMachine")
class Handler{
    constructor(word){
        this.validations = [];
        this.word = word;
        this.validationMachine = new ValidationMachine();
    }
    method(data){}
    getName(){}
    check(data, client){
        let valid = true;

        for (let index = 0; index < this.validations.length; index++) {
            const validation = this.validations[index];
    
            valid = validation.check(data, client);
            if(!valid){
                valid = false;
                break;
            }
            
        }

        return valid;
    }
}

module.exports = Handler