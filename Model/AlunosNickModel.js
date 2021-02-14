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
        // setInterval(()=>{
        //     this.loadAlunosInfo.call(this)
        // }, refreshTime, 'refresh');
    }

    async loadAlunosInfo(){
        this.updating = true;

        try {
            let response = await axios.get(alunosURL);
            
            let item = response.data.split("\n");
            
            for (let index = 1; index < item.length; index++) {
                let element = item[index];
                let itemParams = element.split(",");
            
                if(itemParams[0].length>0){
                    let nick = itemParams[3];
                    let nome = "";
            
                    for (let id = 5; id < 28; id++) {
                        const it = itemParams[id];
                        if(it){
                            nome = it;
                            break;
                        }
                        
                    }
            
                    if(!this.nicks[nick] && nome.length>0){
                        this.nicks[nick] = {
                            "nome": nome
                        }
                    }
                }
            }
            this.nicksCache = this.nicks
            this.updating = false;
            
        } catch (error) {
            console.log("-----Deu erro pegando o arquivo", error)
        }
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

        console.log("------------------------------------------getNameByNick----------------------------------", nick, nicks[nick])

        return nicks[nick];
    }
    
}

module.exports = AlunosNickModel