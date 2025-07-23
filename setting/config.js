const fs = require('fs')






global.owner = "2348087253513" //owner number
global.creatorName = "⸸𝖂𝖎𝖈𝖐𝖊𝖉 𝕺𝖒𝖊𝖍🜏"
global.ownernumber = '2348087253512'  //creator number
global.location = "Nigeria, Ogun-state, ilese"
//================DO NOT CHANGE OR YOU'LL GET AN ERROR=============\
global.footer = "⸸𝖂𝖎𝖈𝖐𝖊𝖉 𝕺𝖒𝖊𝖍🜏" //footer section
global.usePairingCode = true  //Qr badboi Pairing == true + pairing == false + Qr Code
global.link = "https://whatsapp.com/channel/2YW4bG42x"
global.botName = "Bloody_Omeh_V1 ⃟⃟⃟😈⃤☠️"
global.version = "1"
global.author = "_*⸸𝖂𝖎𝖈𝖐𝖊𝖉 𝕺𝖒𝖊𝖍🜏*_"
global.onlyowner = `\`[ 😈 ] Bloody_Omeh_V1 \` \n*

    🚫 *Access Denied!* 🚫
Wow! You're not my owner🗣️
    Sorry, you don't have the necessary permissions to use this command`
  
global.database = `\`[ 😈 ] Bloody_Omeh_V1 \` \n*

    🚫 *Access Denied!* 🚫

    Sorry, you don't have the necessary permissions to use this command.

    *Only users in our database can access.* 😎
*contact ⸸𝖂𝖎𝖈𝖐𝖊𝖉 𝕺𝖒𝖊𝖍🜏 or Bloody Samaritan for database* 
*Whatsapp contact* : *@2348087253512*
*Whatsapp contact* : *@233208418017*
*Whatsapp Channel* : *https://whatsapp.com/channel/0J2YW4bG42x*
  *THANK FOR USING Bloody_Omeh_V1*`

global.mess = {
owner: "Wow! You're not my owner🗣️",
success: "Success Bang",
wait: "please just wait ngab"
}

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})
