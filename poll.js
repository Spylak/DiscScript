
module.exports =client =>{
    const channelIds = ['ID','ID',//channel Ids
]

const addReactions=message =>{
    message.react('')//emoji in there

    setTimeout(()=>{
       message.react('') //emoji in there
    },200)
}
client.on('message',async (message)=>{
    if(channelIds.includes(message.channel.id)){
        addReactions(message)
    } else if (message.content.toLowerCase()=== '!poll'){
        await message.delete()

        const fetched = await message.channel.messages.fetch({limit:1})
        if (fetched&& fetched.first()){
            addReactions(fetched.first())
        }
    }
})
}