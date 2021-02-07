class ValidationMachine{
    constructor(){

        const instance = this.constructor.instance;
        if(instance){
            console.log("PEGOU SINGLETON")
            return instance;
        }

        console.log("Inicializou singleton")

        this.validations = {}
        this.constructor.instance = this;
    }

    addValidation(validationName, validator){
        this.validations[validationName] = validator;

        console.log(validationName, this.validations[validationName])
    }
    getValidation(validationName, data){
        const classPointer = this.validations[validationName];

        console.log(this.validations)

        console.log("---TENTANDO PEGAR  ",validationName, data, classPointer)
        if(classPointer){
            return new classPointer(data);
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