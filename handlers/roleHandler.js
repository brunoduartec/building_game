const Handler = require("./handler")
// Requiring the module 
const xlsxFile = require('read-excel-file/node');
const fileName = "./resources/EGM21.xlsx"

class RoleHandler extends Handler{
    constructor(messageToSend){
        super();
        this.validations = [
            "isABot",
            "isAdminValidation"
        ]
        this.messageToSend = messageToSend;
        
        console.log("====COMEÇOU===")
        // Reading our test file 
        xlsxFile(fileName).then((rows) => {
                console.log("-----PEGOU")
                console.log(rows)

        });
    }
    method(data){
        const message = data;
        console.log(message.guild.roles)
        let myRole = message.guild.roles.cache.get(message.author.id);
        message.channel.send(this.messageToSend + myRole.toString());
    }
}

module.exports = RoleHandler

