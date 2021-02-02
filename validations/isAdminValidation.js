const Permission = require("../permission.js")
const permission = new Permission();
const Validation = require("./validation")

class isAdminValidation extends Validation {
    check(data){
        let message = data

        console.log("Informacoes do usuario", message.author)

        let validation = permission.checkPermission(message.author.id);
        console.log(`Validating: isAdminValidation: ${validation}`);
        return validation
    }
}

module.exports = isAdminValidation;