const Validation = require("./validation")

class notHasRole extends Validation {
    constructor(roleNames){
        super();
        this.roleNames = roleNames;
    }
    check(data){
        let message = data
        let validation = true;

        for (let index = 0; index < this.roleNames.length; index++) {
            let roleName = this.roleNames[index];

            let role = message.guild.roles.cache.find(r => r.name === roleName);
            let hasRole = message.member.roles.cache.has(role.id)

            if(hasRole)
            {
                console.log("===================ACHOU ROLE==================", roleName);
                validation = false;
                break;
            }
        }

        console.log(`Validating: notHasRole: ${validation}`);

        console.log("============================NAO ACHOU ROLE=========================");
        return validation
    }
}

module.exports = notHasRole;