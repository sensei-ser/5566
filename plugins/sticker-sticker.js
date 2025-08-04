import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'
import { db } from '../lib/postgres.js';

let handler = async (m, { conn, args, usedPrefix, command }) => {
const userResult = await db.query('SELECT sticker_packname, sticker_author FROM usuarios WHERE id = $1', [m.sender]);
const user = userResult.rows[0] || {};
let stiker = false;
let f = user.sticker_packname || global.info.packname;
let g = (user.sticker_packname && user.sticker_author ? user.sticker_author : (user.sticker_packname && !user.sticker_author ? '' : global.info.author));
try {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''
if (/webp|image|video/g.test(mime)) {
if (/video/g.test(mime)) if ((q.msg || q).seconds > 18) return m.reply('⚠️ ¿Где ты видел 15-секундный стикер, придурок? Сделайте видео короче, максимум на 12 секунд.')
let img = await q.download?.()
if (!img) return m.reply(`*А изображение? 🤔 Ответьте на изображение, чтобы сделать стикер. Используйте:* ${usedPrefix + command}`) 
let out
try {
stiker = await sticker(img, false, f, g)
} catch (e) {
console.error(e)
} finally {
//conn.reply(m.chat, `Calma crack estoy haciendo tu sticker 👏\n\n> *Recuerda los video son de 7 segundos*`, m)
if (!stiker) {
if (/webp/g.test(mime)) out = await webp2png(img)
else if (/image/g.test(mime)) out = await uploadImage(img)
else if (/video/g.test(mime)) out = await uploadFile(img)
if (typeof out !== 'string') out = await uploadImage(img)
stiker = await sticker(false, out, f, g)
}}} else if (args[0]) {
if (isUrl(args[0])) stiker = await sticker(false, args[0], f, g)
else return m.reply('URL invalido')
}} catch (e) {
console.error(e)
if (!stiker) stiker = e
} finally {
if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '',m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: info.wm, body: ``, mediaType: 2, sourceUrl: [info.nna, info.nna2, info.md, info.yt].getRandom(), thumbnail: m.pp}}}, { quoted: m })
else return m.reply(`*А изображение? 🤔 Ответьте на изображение, чтобы сделать стикер. Используйте:* ${usedPrefix + command}`) 
}}
handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = ['с', 'стикер'] 
handler.register = true
export default handler

const isUrl = (text) => {
return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}
