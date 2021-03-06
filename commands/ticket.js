const channelId = '829250052814929958'//ticket channel Id
const check = '👍'//emoji string
let registered = false 
const registerEvent=client=>{
if(registered){
    return
}
registered=true
client.on('messageReactionAdd',(reaction,user)=>{
    if(user.bot){
        return
    }
    const {message}=reaction
    if(message.channel.id===channelId){
        message.delete()
    }
})
}
module.exports={
    commands:['ticket','support'],
    minArgs:1,
    expectedArgs:'<message>',
    callback: (userMessage,arguments,text,client)=>{
        const {guild,member}=userMessage
        registerEvent(client)
        const channel = guild.channels.cache.get(channelId)
        channel.send(`A new ticket has been created by <@${member.id}>

        "${text}"
        
        Click the ${check} icon when this issue has been resolved`)
        .then(ticketMessage=>{
            ticketMessage.react(check)

            userMessage.reply('Your ticket has been sent!Expect a reply soon!')
        })

    },

}