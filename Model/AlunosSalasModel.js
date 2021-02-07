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

}

module.exports = AlunosSalasModel