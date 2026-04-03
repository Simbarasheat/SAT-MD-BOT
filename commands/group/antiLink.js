module.exports = {
    name: "antilink",
    execute: async (sock, msg) => {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "🛡️ Anti-link activated (demo mode)"
        });
    }
};
