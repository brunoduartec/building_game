const Validation = require("./validation")

class isAdminValidation extends Validation {
    check(data){
        let message = data
        let role = message.guild.roles.cache.find(r => r.name === "Coordenação");
        let hasRole = message.member.roles.cache.has(role.id);

        let validation = hasRole;

        console.log(`Validating: isAdminValidation: ${validation}`);
        return validation
    }
}

module.exports = isAdminValidation;