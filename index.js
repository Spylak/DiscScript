const path=require('path')
const fs=require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
const command = require('./command')
//const firstMessage = require('./first-message')
//const privateMessage = require('./private-message')
//const roleClaim = require('./role-claim')
const poll = require('./poll')
const welcome = require('./welcome')
const memberCount = require('./member-count')
const sendMessage = require('./send-message')
const mongo = require('./mongo')
const welcomev2 = require('./welcomev2')
const antiAd = require('./anti-ad')
const messageCount = require('./message-counter')
//const inviteNotifications = require('./invite-notification')
client.on('ready',async ()=>{
    console.log('The client is ready')
    antiAd(client)
    //inviteNotifications(client)
    const baseFile = 'command-base.js'
    const commandBase = require(`./commands/${baseFile}`)

    const readCommands = dir=>{
        const files = fs.readdirSync(path.join(__dirname,dir))
        for(const file of files){
            const stat = fs.lstatSync(path.join(__dirname,dir,file))
            if(stat.isDirectory()){
                readCommands(path.join(dir,file))
            }else if(file !== baseFile){
                const option = require(path.join(__dirname,dir,file))
                commandBase(option)
            }
        }
    }
    readCommands('commands')
    commandBase.listen(client);
    messageCount(client)
    //const guild = client.guilds.cache.get('ID') //server id
    //const channel = guild.channels.cache.get('ID') //channel ID 
    welcomev2(client)
    await mongo().then(mongoose =>{
        try{
            console.log('Connected to mongo!')
            //try come here
        // }catch{
        //     //handle the error here 
        // 
    }finally{
        mongoose.connection.close()
            //will always run 
        }
    })


    //sendMessage(channel,'hello',3)// -1 to not get deleted
    //memberCount(client)
    // welcome(client)
  //  poll(client)
})
client.login(config.token)