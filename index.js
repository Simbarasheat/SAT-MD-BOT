//-----edit by nimeshka mihiran-----//

const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const pino = require("pino");
const handler = require("./handler");

let sock = null;
let botReady = false;

async function startBot() {
    try {
        const { state, saveCreds } = await useMultiFileAuthState("auth");

        sock = makeWASocket({
            logger: pino({ level: "silent" }),
            auth: state,
            printQRInTerminal: true
        });

        sock.ev.on("creds.update", saveCreds);

        sock.ev.on("connection.update", (update) => {
            const { connection, lastDisconnect } = update;
            if (connection === "open") {
                console.log("✅ Bot Connected Successfully");
                botReady = true;
            } else if (connection === "close") {
                console.log("❌ Bot Disconnected");
                botReady = false;
                if (lastDisconnect?.error?.output?.statusCode !== 401) {
                    startBot();
                }
            }
        });

        sock.ev.on("messages.upsert", async ({ messages }) => {
            if (!messages || messages.length === 0) return;
            
            const msg = messages[0];
            if (!msg.message) return;

            try {
                await handler(sock, msg);
            } catch (err) {
                console.error("Error handling message:", err);
            }
        });

        console.log("🤖 SAT MD BOT STARTING...");
    } catch (err) {
        console.error("Error starting bot:", err);
        setTimeout(startBot, 5000);
    }
}

// Only start bot if not in Vercel environment
if (!process.env.VERCEL) {
    startBot();
}

module.exports = { startBot, sock, botReady };
