module.exports = {
    name: "pastpaper",
    execute: async (sock, msg, args) => {
        const [country, year, subject, paper] = args;

        const reply = `📄 Searching past paper...

Country: ${country}
Year: ${year}
Subject: ${subject}
Paper: ${paper}

✅ Feature coming with real PDFs soon.`;

        await sock.sendMessage(msg.key.remoteJid, { text: reply });
    }
};
