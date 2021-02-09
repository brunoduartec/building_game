class ValidationMachine{
    constructor(){
        const instance = this.constructor.instance;
        if(instance){
            return instance;
        }
        this.validations = {}
        this.constructor.instance = this;
    }

    addValidation(validationName, validator){
        console.log(validationName, validator)
        this.validations[validationName] = validator;
    }
    getValidation(validationName, data1, data2){
        const classPointer = this.validations[validationName];

        if(classPointer){
            return new classPointer(data1, data2);
        }
        else return null;
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