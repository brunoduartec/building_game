const env = require("./env.json")
const botInfo = env.discord.bot

class Permission{
    checkPermission(memberId){
        console.log(`Testing ${memberId}`)
        return botInfo.owners.includes(memberId);
    }
}

module.exports = Permission