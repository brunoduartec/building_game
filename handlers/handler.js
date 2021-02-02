let ValidationMachine = require("../validations/validationMachine")
class Handler{
    constructor(){
        this.validations = []
        this.validationMachine = new ValidationMachine();
    }
    method(data){}
    check(data){
        let valid = true;
        this.validations.forEach(validation => {
            console.log(validation)
            if(!this.validationMachine.check(validation, data) ){
                return false;
            }
        });

        return valid;
    }
}

module.exports = Handler