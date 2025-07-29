import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'

//owner
global.owner = [
['77072763560'],
['77072763560'],
['77072763560'],
['77072763560'],
['77072763560'],
['77072763560']
]

//Información 
globalThis.info = {
wm: "𝙇𝙤𝙡𝙞𝘽𝙤𝙩-𝙈𝘿",
vs: "2.0.0 (beta)",
packname: "𝗦𝗧𝗜𝗖𝗞𝗘𝗥𝗦❤️‍🔥 - Ванилька\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
author: "Owner: @elrebelde21\n• Dueña: @itschinita_official",
apis: "https://delirius-apiofc.vercel.app",
apikey: "GataDios",
fgmods: { url: 'https://api.fgmods.xyz/api', key: 'elrebelde21' },
neoxr: { url: 'https://api.neoxr.eu/api', key: 'GataDios' },
img2: "https://telegra.ph/file/39fb047cdf23c790e0146.jpg",
img4: fs.readFileSync('./media/Menu2.jpg'),
yt: "https://www.youtube.com",
tiktok: "https://www.tiktok.com",
md: "https://github.com",
fb: "https://www.facebook.com",
nn: "https://chat.whatsapp.com", //Grupo ofc1
nn2: "https://chat.whatsapp.com", //Grupo ofc2
nn3: "https://chat.whatsapp.com", //Colab Loli & Gata
nn4: "https://chat.whatsapp.com", //Enlace Ванилька
nn5: "https://chat.whatsapp.com", //A.T.M.M
nn6: "https://chat.whatsapp.com", //Dev support 
nna: "https://whatsapp.com",
nna2: "https://whatsapp.com"
}

//----------------------------------------------------

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
