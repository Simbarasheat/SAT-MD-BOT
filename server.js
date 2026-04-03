const express = require("express");
const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");

const app = express();
const PORT = 3000;

let botStatus = "OFFLINE";

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("auth");

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false
    });

    sock.ev.on("creds.update", saveCreds);

    // 🔗 Pairing Code Route
    app.get("/pair", async (req, res) => {
        try {
            let number = req.query.number;

            if (!number) {
                return res.json({ code: "Enter phone number!" });
            }

            const code = await sock.requestPairingCode(number);
            res.json({ code });

        } catch (err) {
            res.json({ code: "Error generating code" });
        }
    });

    // 📊 Status System
    sock.ev.on("connection.update", (update) => {
        if (update.connection === "open") {
            botStatus = "ONLINE";
            console.log("✅ Bot Connected");
        } else if (update.connection === "close") {
            botStatus = "OFFLINE";
            console.log("❌ Bot Disconnected");
        }
    });

    app.get("/status", (req, res) => {
        res.json({
            status: botStatus,
            commands: 387,
            owner: "Simbarashe Tembo.A"
        });
    });
}

startBot();

app.listen(PORT, () => {
    console.log(`🌐 Server running at http://localhost:${PORT}`);
});