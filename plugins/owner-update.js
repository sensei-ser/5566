import { execSync } from 'child_process';

const handler = async (m, { conn, text }) => {
try {
const stdout = execSync('git pull' + (m.fromMe && text ? ' ' + text : ''));
let messager = stdout.toString()
if (messager.includes('Already up to date.')) messager = `⚠️ 𝙔𝘼 𝙀𝙎𝙏𝘼 𝘼𝘾𝙏𝙐𝘼𝙇𝙄𝙕𝘼𝘿𝙊 𝘼 𝙇𝘼 𝙑𝙀𝙍𝙎𝙄𝙊́𝙉 𝙍𝙀𝘾𝙄𝙀𝙉𝙏𝙀.`
if (messager.includes('Updating')) messager = `*[ UPDATE ]*\n\n` + stdout.toString()
conn.reply(m.chat, messager, m);
} catch {      
try {    
const status = execSync('git status --porcelain');
if (status.length > 0) {
const conflictedFiles = status
.toString()
.split('\n')
.filter(line => line.trim() !== '')
.map(line => {
if (line.includes('.npm/') || line.includes('.cache/') || line.includes('tmp/') || line.includes('BotSession/') || line.includes('npm-debug.log')) {
return null;
}
return '*→ ' + line.slice(3) + '*'})
.filter(Boolean);
if (conflictedFiles.length > 0) {
const errorMessage = `⚠️ Error\n> *В файлах бота были обнаружены локальные изменения, которые вступают в противоречие с новыми обновлениями репозитория. чтобы обновить, переустановите бота или выполните обновления вручную.*\n\n*\`КОНФЛИКТУЮЩИЙ ФАЙЛ :\`*\n\n${conflictedFiles.join('\n')}.*`
await conn.reply(m.chat, errorMessage, m);  
}}
} catch (error) {
console.error(error);
if (error.message) {
const errorMessage2 = `\n⚠️ ` + error.message;
}
await m.reply(`⚠️ ОШИБКА, ЧТО СЛУЧИЛОСЬ, Редактировать тебя с гребаного идиотского сервера 🙄`) 
}}};
handler.help = ['update']
handler.tags = ['owner']
handler.command = /^(об|actualizar|обновить)$/i;
handler.owner = true;
export default handler;
