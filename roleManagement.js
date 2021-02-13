const ParticipanteModel = require("./Model/ParticipanteModel");

class RoleManagement{

    constructor(){

        this.alunoclasses = []
        let currentLetter = "a"
        
        for (let index = 0; index < 25; index++) {
            this.alunoclasses.push(`atividade-${currentLetter}`);
            currentLetter = String.fromCharCode(currentLetter.charCodeAt() + 1);
        }


        this.forumclasses = []

        for (let index = 0; index < 8; index++) {
            this.forumclasses.push(`forum-${index}`)
        }
    }

    _saveToDB(name, nick){
        const newParticipant = new ParticipanteModel({
            name: name,
            nick: nick,
            helped: true,
            interacted: true
          });

          newParticipant
          .save()
          .then(result => {
            console.log(`Ajudou-----: ${name}`)
          })
          .catch(error => {
            console.log("Error---", error)
          });
    }

    giveRole(message,nome, specificRoleName, isStudent){
        let generalRoleName = ""

        if(isStudent){
            generalRoleName = "Aluno"
        }
        else{
            generalRoleName = "Voluntário"
        }

        var generalRole= message.guild.roles.cache.find(role => role.name === generalRoleName);
        var role= message.guild.roles.cache.find(role => role.name === specificRoleName);

        if(role){
            message.member.roles.add(generalRole);
            message.member.roles.add(role);
            this._saveToDB(nome, message.author.username);
            return true;
        }
        else{
            return false;
        }
    }

    getWorkersRoles(){
        let noRoles = [];
        
        noRoles.push("Transmissão"),
        noRoles.push("Só quero te Ouvir"),
        noRoles.push("Artes"),
        noRoles.push("Câmara de sustentação"),
        noRoles.push("Engajamento"),
        noRoles.push("Família"),
        noRoles.push("Fórum dos Trabalhadores"),
        noRoles.push("Envolvimento"),
        noRoles.push("Integração"),
        noRoles.push("Voluntários")
        return noRoles;
    }

    getStudentsRoles(){
        return this.alunoclasses;
    }

    getForumRoles(){
        return this.forumclasses;
    }
}

module.exports = RoleManagement