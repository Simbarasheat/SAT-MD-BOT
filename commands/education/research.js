module.exports = {
    name: "research",
    execute: async (sock, msg, args) => {
        const query = args.join(" ");

        const reply = `🧠 Research result:

${query}

This will be powered by AI (GPT) when API is connected.`;

        await sock.sendMessage(msg.key.remoteJid, { text: reply });
    }
};
