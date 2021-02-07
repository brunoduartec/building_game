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
            console.log("VALIDATION", validation)
    
            valid = validation.check(data, client);
            console.log(`${validation}: ${valid}`)
            if(!valid){
                valid = false;
                break;
            }
            
        }

        return valid;
    }
}

module.exports = Handler