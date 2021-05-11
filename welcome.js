

module.exports = client =>{
    const channelId = 'ID' //ID
    const targetChannelId = 'ID'
    client.on('guildMemberAdd',(member)=>{
        console.log(member)

        const message = `Please welcome <@${member.id} to the server!
        Please check out ${member.guild.channels.cache.get(targetChannelId)
        .toString()}>`

        const channel = member.guild.channels.cache.get(channelId)
        channel.send(message)
    })
}