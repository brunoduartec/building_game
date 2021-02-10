const XLSX = require('xlsx');
const axios = require('axios').default;
const {alunosURL} = require("../env.json")
const refreshTime = 5*1000


class AlunosNickModel{
    constructor(){
        let instance = this.constructor.instance
        if(instance){
            return instance;
        }
        this.nicks = {}
        this.nicksCache = {}
        this.updating = false;

        this.constructor.instance = this;
    }


    async loadAlunos(){
        await this.loadAlunosInfo()
        setInterval(()=>{
            this.loadAlunosInfo.call(this)
        }, refreshTime, 'refresh');
    }

    async loadAlunosInfo(){
        this.updating = true;

        let response = await axios.get(alunosURL);

        let item = response.data.split("\n");
        
        for (let index = 1; index < item.length; index++) {
            let element = item[index];
            let itemParams = element.split(",");

            if(itemParams[0].length>0){
                let nome = itemParams[1];
                let nick = itemParams[2];

                if(!this.nicks[nick]){
                    this.nicks[nick] = {
                        "nome": nome
                    }
                }
            }
        }
        this.nicksCache = this.nicks
        this.updating = false;
      
    }

    async loadAlunosInfoByXLSX(alunos){
        const nickFileName = "./resources/nicks.xlsx"
        var workbook = XLSX.readFile(nickFileName);
        var sheet_name_list = workbook.SheetNames;
        let nicksFromXLS =XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

        nicksFromXLS.forEach(nick => {
            let aluno = alunos[nick["NOME"]]

            if(aluno){
                this.nicks[nick["NICK"]] = {
                    "nome": nick["NOME"]
                }
            }
        });
    }


    getNicks(){
        if(this.updating){
            return this.nicksCache;
        }
        else{
            return this.nicks;
        }
    }
    getNameByNick(nick){
        let nicks = this.getNicks();
        return nicks[nick];
    }
    
}

module.exports = AlunosNickModel