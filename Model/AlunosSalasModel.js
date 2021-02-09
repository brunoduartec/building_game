const XLSX = require('xlsx');
const fileName = "./resources/alunos.xlsx"


class AlunosSalasModel{
    constructor(){
        let instance = this.constructor.instance;
        if(instance){
            return instance;
        }
        this.alunos = {}

        this.constructor.instance = this;
    }
    async loadInfo(){
        var workbook = XLSX.readFile(fileName);
        var sheet_name_list = workbook.SheetNames;
        let alunosFromXLS =XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

        alunosFromXLS.forEach(aluno => {
            this.alunos[aluno["NOME"]] = {
                "nome": aluno["NOME"],
                "sala": aluno["SALA"],
                "cracha":aluno["CRACHÁ"]
            }
        });
    }

    getAlunos(){
        return this.alunos;
    }
    getAlunoByName(name){
        return this.alunos[name];
    }

    findAlunoInAMessage(message){
        let keys = Object.keys(this.alunos);
        let filter = m => message.toLowerCase().includes(m.toString().toLowerCase());

        let firstItemFinded = keys.find(filter);
        if(firstItemFinded){
            return this.alunos[firstItemFinded];
        }
        else{
            return null;
        }
    }

}

module.exports = AlunosSalasModel