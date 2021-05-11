command(client,'ban',message =>{
    const {member , mentions} = message

    const tag = `<@${member.id}>`

    if(member.hasPermission('ADMINISTRATOR')||
    member.hasPermission('BAN_MEMBERS')){
        const target = mentions.users.first()
        if(target){
            const targetNumber = message.guild.members.cache.get(target.id)
            targetNumber.ban()
            message.channel.send(`<@${tag}>That user has been banned.`)
        }else{
            message.channel.send(`<@${tag}> Please specify someone to ban.`)
        }
    }else{
        message.channel.send(
            `<@${tag}> You do not have the permission for this command !`
        )
    }

})
command(client,'kick',message =>{
    const {member , mentions} = message

    const tag = `<@${member.id}>`

    if(member.hasPermission('ADMINISTRATOR')||
    member.hasPermission('KICK_MEMBERS')){
        const target = mentions.users.first()
        if(target){
            const targetNumber = message.guild.members.cache.get(target.id)
            targetNumber.kick()
            message.channel.send(`<@${tag}>That user has been kicked.`)
        }else{
            message.channel.send(`<@${tag}> Please specify someone to kick.`)
        }
    }else{
        message.channel.send(
            `<@${tag}> You do not have the permission for this command !`
        )
    }

})