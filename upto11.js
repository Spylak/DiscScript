

module.exports = client =>{
command(client, 'help',message=>{
    message.channel.send(`
    These are my supported commands:

    **!help** - Displays the help menu
    **!add <num1> <num2>** - Adds two numbers 
    **!sub <num1> <num2>** - Subtracts two numbers
    `)  
  })
  const {prefix } = config
  client.user.setPresence({
      activity:{
          name : `Use "${prefix}" for help`
      },
  })



  command(client , 'serverinfo' , (message)=>{
      const {guild} = message
      const {name , region , memberCount , owner , afkTimeout} = guild
      const icon =guild.iconURL()

      const embed = new Discord.MessageEmbed()
          .setTitle(`Server info for "${name}"`)
          .setThumbnail(icon)
          .addField({
              name:'Region',
              value:region
          },
          {
              name:'Members',
              value:memberCount
          },
          {
              name:'Owner',
              value:owner.user.tag
          },
          {
              name:'AFK Timeout',
              value:afkTimeout /60
          }
          )

          message.channel.send(embed)
  })



  command(client,'embed',(message)=>{
      console.log(message.author)
      const logo = ''
      //!embed
      const embed = new Discord.MessageEmbed()
      .setTitle('Example text embed')
      .setURL('')
      .setAuthor(message.author.username)
      .setImage(logo)
      .setThumbnail(logo)
      .setFooter('This is a footer')
      .setColor('#00AFF')
      .addField(
          {
          name:'Field 1 ',
          value:'Hello world',
          inline:true,
      },
      {
          name:'Field 1 ',
          value:'Hello world',
          inline:true,
      },
      {
          name:'Field 1 ',
          value:'Hello world',
          inline:true,
      },
      {
          name: 'Field 4',
          value : 'Hello world',
      }
      )

      message.channel.send(embed)
  })




  command(client,'createtextchannel',(message)=>{
      const content = message.content.replace('!createtextchannel ','')
      message.guild.channels.create(name,{
          type:'text'
      }).then(channel=>{
          const categoryId = 'ID'
          channel.setParent(categoryId)
      })
  })
  command(client , 'createvoicechannel',(message)=>{
      const name = message.content.replace('!createvoicechannel ','')
      message.guild.channels.create(name,{
          type:'voice'
      }).then(channel=>{
          const categoryId = 'ID'
          channel.setParent(categoryId)
          channel.setUserLimit(10)
      })
  })



  privateMessage(client,'ping','Pong!')
  firstMessage(client,'829250052814929952','hello world',[''])
  client.users.fetch('ID').then((user)=>{
      user.send('Yo!')
  })
  command(client , 'ping',(message)=>{
      message.channel.send('Pong!')
  })
  command(client,'servers',(message)=>{
      client.guilds.cache.forEach((guild)=>{
          message.channel.send(`${guild.name} has a total of ${guild.memberCount} members`)
      })
  })
  command(client,['cc','clearchannel'],message=>{
      if(message.member.hasPermission('ADMINISTRATOR')){
          message.channel.messages.fetch().then(results=>{
              message.channel.bulkDelete(results)
          })
      }
  })
  command(client,'status',message=>{
      if(message.member.hasPermission('ADMINISTRATOR')){
      const content = message.content.replace('!status ','')
      client.user.setPresence({
          activity:{
              name:content,
              type :0,
          },
      })
  }
  })
}