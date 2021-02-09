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
                validation = false;
                break;
            }
        }

        return validation
    }
}

module.exports = notHasRole;