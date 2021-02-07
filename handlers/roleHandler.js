const Handler = require("./handler")

const AlunosSalasModel = require("../Model/AlunosSalasModel");
const alunosSalasModel = new AlunosSalasModel();

const AlunosNickModel = require("../Model/AlunosNickModel");
const alunosNickModel = new AlunosNickModel();

const ValidationMachine = require("../validations/validationMachine");
const validationMachine = new ValidationMachine();

class RoleHandler extends Handler{
    constructor(word, messageToSend){
        super(word);
        

        let alunoclasses = [];

        let currentLetter = "a"
        
        for (let index = 0; index < 25; index++) {
            alunoclasses.push(`atividade-${currentLetter}`);
            currentLetter = String.fromCharCode(currentLetter.charCodeAt() + 1);
        }

        this.validations = [
            validationMachine.getValidation("isNotABot"),
            validationMachine.getValidation("isAdminValidation"),
            validationMachine.getValidation("isAtChannel", ["testes"]),
            validationMachine.getValidation("notHasRole",alunoclasses)
            // validationMachine.getValidation("containsWord", this.word)
        ]
        this.messageToSend = messageToSend;
         this.init();   
    }

    async init(){
        await alunosSalasModel.loadInfo();
        await alunosNickModel.loadAlunos();
    }

    getName(){
        return "RoleHandler"
    }

    _giveRole(message, sala){

        let roleName = `atividade-${sala.toLowerCase()}`
        var alunoRole= message.guild.roles.cache.find(role => role.name === "Aluno");
        var role= message.guild.roles.cache.find(role => role.name === roleName);

        console.log("----ROLE----", role.guild.members.cache)
        
        if(role){
            message.member.roles.add(alunoRole);
            message.member.roles.add(role);
            return true;
        }
        else{
            return false;
        }
    }

    getAlunosInfo(nick){
        let alunoNick = alunosNickModel.getNameByNick(nick);
        if(alunoNick){
            let name = alunoNick.nome;
            let alunoSalaInfo = alunosSalasModel.getAlunoByName(name)
            
            let aluno = {
                "nome": name,
                "sala": alunoSalaInfo.sala,
                "crachá": alunoSalaInfo.cracha
            }
    
            return aluno;
        }
        else{
            return null;
        }
    }

    method(data){
        const message = data;

        let username = message.author.username
        let aluno = this.getAlunosInfo(username);

        if(aluno){
            message.channel.send(`Oi, <@${message.author.id}> que bom que você já chegou`)
            message.channel.send(`${this.messageToSend}: ${aluno.sala}` );
            let hasAdded = this._giveRole(data, aluno.sala);

            if(hasAdded){
                message.channel.send("Ela já deve ter aparecido ali à esquerda" );
            }
            else{
                message.channel.send(`Não consegui adicionar você na sala atividade-${aluno.sala.toLowerCase()}` );
            }
        }
        else
            message.channel.send(`Xi <@${message.author.id}>, eu ainda não achei sua sala, você pode responder esse forms https://forms.gle/kpGk3rEdRqmuAkhz8 aqui pra me ajudar? ` );
    }
}

module.exports = RoleHandler

