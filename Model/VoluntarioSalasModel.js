const XLSX = require('xlsx');
const fileName = "./resources/voluntarios.xlsx"


class VoluntarioSalasModel{
    constructor(){
        let instance = this.constructor.instance;
        if(instance){
            return instance;
        }
        this.voluntarios = {}

        this.constructor.instance = this;
    }
    async loadInfo(){
        var workbook = XLSX.readFile(fileName);
        var sheet_name_list = workbook.SheetNames;
        let alunosFromXLS =XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

        alunosFromXLS.forEach(voluntario => {
            let nome =this.cleanup(voluntario["NOME"]);

            console.log("-------PEGO---------------",voluntario["FÓRUM"] )

            this.voluntarios[nome] = {
                "nome": nome,
                "sala": voluntario["FÓRUM"],
                "cracha":voluntario["CRACHÁ"]
            }
        });
    }

    getAlunos(){
        return this.voluntarios;
    }
    getVoluntarioByName(name){
        return this.voluntarios[name];
    }

    cleanup (str) {
        str = str.toLowerCase();
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
    
        return str.trim();
    };

    findVoluntarioInAMessage(message){
        let keys = Object.keys(this.voluntarios);

        console.log("Testando voluntario===========================> ", message)

        let filter = m => this.cleanup(message).includes(m);

        let firstItemFinded = keys.find(filter);

        if(firstItemFinded){
            return this.voluntarios[firstItemFinded];
        }
        else{
            console.log("Não achou voluntario na mensagem", message)

            return null;
        }
    }

}

module.exports = VoluntarioSalasModel