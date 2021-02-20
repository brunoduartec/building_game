const Handler = require("./handler")
const ValidationMachine = require("../validations/validationMachine");
const Discord = require("discord.js");
const Jimp = require("jimp")

const validationMachine = new ValidationMachine();

class SelfHandler extends Handler{
    constructor(word,messageToSend){
        super(word);

        this.validations = [
            validationMachine.getValidation("containsWord", this.word),
            validationMachine.getValidation("isNotABot"),
            validationMachine.getValidation("wasMentioned")
        ]
        this.messageToSend = messageToSend;
    }
    async method(data){
        const message = data;

        // let user = message.mentions.users.first()
        let user = message.author;

        // let imageToAppend = "https://i.pinimg.com/originals/7b/51/9a/7b519a3422f940011d34d1f9aa75f683.png"
        let imageToAppend = "./public/assets/geraldinho.png"
        let pfp = user.avatarURL({format: 'png', dynamic: true, size: 512})
        let image = await Jimp.read(pfp);

        console.log("------------IMAGE--------------")
        console.log(image)

        image.composite((await Jimp.read(imageToAppend)).resize(512,512),0,0)
        let selfi = new Discord.MessageAttachment( await image.getBufferAsync(Jimp.MIME_PNG))

        message.channel.send(`Oi <@${message.author.id}>: ${this.messageToSend}`);
        message.reply(selfi)
    }
    getName(){
        return "SelfHandler"
    }
}

module.exports = SelfHandler