const mongo = require('./mongo')
const command = require('./command')
const welcomeSchema = require('./schemas/welcomev2-schema')

module.exports=(client)=>{
    //!setwelcome <message>
    const cache={} //guildId: [channelId , text]


    command(client,'setwelcome',async (message)=>{
        const {member , channel , content, guild }=message
        if(!member.hasPermission('ADMINISTRATOR')){
            channel.send('You do not have permissions !')
            return
        }

        let textMessage= content
        const splitted = textMessage.split(' ')
        if(splitted.lenght <2 ){
            channel.send('Please provide a welcome message')
            return
        }
        split.shift()
        text = split.join(' ')

        cache[guild.id]=[channel.id,textMessage]


        await mongo().then(async (mongoose) =>{
            try {
              await  welcomeSchema.findOneAndUpdate({
                  _id:guild.id
              },
              {
                  _id:guild.id,
                  channelId : channel.id,
                  textMessage
              },
              {
                  upsert: true
              })
            }
            finally{
                mongoose.connection.close()
            }
        })
    })

 const onJoin =async  member =>{
    const {guild } = member
    let data = cache[guild.id]
    if(!data){
        console.log('fetching from DB')
        await mongo().then(async mongoose=>{
            try{
                const result = await welcomeSchema.findOne({_id:guild.id})
                cache[guild.id]=[result.channelId,result.textMessage]
            }finally{
                mongoose.connection.close()
            }
        })
    }
    const channelId=data[0]
    const textMessage = data[1]
    const channel = guild.channels.cache.get(channelId)
    channel.send(textMessage.replace(/<@>/g ,`<@${member.id}>`))
 }
command(client,'simjoin',message=>{
    onJoin(message.member)
})
client.on('guildMemberAdd',member=>{
    onJoin(member)
})

}