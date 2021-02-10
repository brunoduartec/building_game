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
                "nome": this.slugify(aluno["NOME"]).trim(),
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

    slugify (str) {
        var map = {
            '-' : ' ',
            '-' : '_',
            'a' : 'á|à|ã|â|À|Á|Ã|Â',
            'e' : 'é|è|ê|É|È|Ê',
            'i' : 'í|ì|î|Í|Ì|Î',
            'o' : 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
            'u' : 'ú|ù|û|ü|Ú|Ù|Û|Ü',
            'c' : 'ç|Ç',
            'n' : 'ñ|Ñ'
        };
        
        for (var pattern in map) {
            str = str.replace(new RegExp(map[pattern], 'g'), pattern);
        };
    
        return str;
    };

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