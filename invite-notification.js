module.exports = client =>{
    const invites ={}//{guildId: {memberId : count}}
    const getInviteCounts = async (guild) =>{
        return await new Promise(resolve=>{
        guild.fetchInvites.then(invites =>{
            const inviteCounter ={} // {memberId:count}
            invites.forEach(invite => {
                const {uses,inviter}=invite
                const{username , discriminator}=inviter
                
                const name = `${username}#${discriminator}`
                inviteCounter[name] = (inviteCounter[name]||0)+uses
            })
            resolve(inviteCounter)
        })
    })
    }
    client.guild.cache.forEach(async guild=>{
        invites[guild.id] = await getInviteCounts(guild)
    })
    client.on('guildMemberAdd',async member=>{
        const {guild,id }=member
        const invitesBefore = invites[guild.id]
        const invitesAfter = await getInviteCounts(guild)
    for (const inviter in invitesAfter){
       if(invitesBefore[inviter]===invitesAfter[inviter]-1){
        const channelId = '' //channel Id
        const channel = guild.channels.cache.get(channelId)
        const count = invitesAfter
        channel.send(`Please welcome <@${id}> to the DiscordServer!
        Invited by ${inviter}(${count} invites)`) 
        invites[guild.id]=invitesAfter
        return 
       } 
    }
    })
}