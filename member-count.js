module.exports=client=>{
    const channelId ='ID'

    const updateMembers = guild =>{
        const channel = guild.channels.cache.get(channelId)
        channel.setName(`Members: ${guild.memberCount.toLocaleString()}`)
        //500 ->500
        //1300 -> 1,300 locale string
    }
    client.on('guildMemberAdd',(member)=> updateMembers(member.guild))
    client.on('guildMemberRemove',(member)=> updateMembers(member.guild))


    const guild = client.guilds.cache.get('ID')
    updateMembers(guild)
}