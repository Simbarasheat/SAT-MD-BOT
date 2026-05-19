module.exports = {
    name: "owner",
    description: "Get owner information",
    async execute(sock, msg, args) {
        try {
            const ownerText = `
╔════════════════════════════════╗
║        👤 OWNER INFO           ║
╠════════════════════════════════╣
║ Phone: 260772697513            ║
║ Name: SAT Limited              ║
╚════════════════════════════════╝
            `;

            await sock.sendMessage(msg.key.remoteJid, { text: ownerText });
        } catch (err) {
            console.error("Error in owner command:", err);
        }
    }
};
