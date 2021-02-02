class ValidationMachine{
    constructor(){
        if(this.constructor.instante){
            return this.constructor.instance
        }

        this.validations = {}
        this.constructor.instance = this;
    }

    addValidation(validationName, validator){
        this.validations[validationName] = validator;
    }

    check(validationName, data){
        let keys = Object.keys(this.validations);

        if(validationName in keys){
            return this.validations[validationName].check(data);
        }
        else{
            return false;
        }
    }
}

module.exports = ValidationMachine;