module.exports = {
    name: "textbook",
    execute: async (sock, msg, args) => {
        const [country, subject] = args;

        const reply = `📘 Searching textbook...

Country: ${country}
Subject: ${subject}

✅ Textbook system will fetch PDFs soon.`;

        await sock.sendMessage(msg.key.remoteJid, { text: reply });
    }
};
