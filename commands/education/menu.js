module.exports = {
    name: "menu",
    execute: async (sock, msg) => {
        const text = `
╭┈───〔 SAT MD BOT V3 〕┈───⊷
├▢ 🤖 Owner: Simbarashe Tembo.A.
├▢ 📜 Commands: 387+
├▢ 📦 Prefix: .
├▢ ⚙️ Mode: public
├▢ 🏷️ Version: 3.0.0

1️⃣ AI
2️⃣ Settings
3️⃣ Educational
4️⃣ Owner
5️⃣ Downloader
6️⃣ Group
7️⃣ Tools
8️⃣ Fun
9️⃣ More...
╰───────────────────────
`;

        await sock.sendMessage(msg.key.remoteJid, { text });
    }
};
