module.exports = {
    name: "play",
    execute: async (sock, msg, args) => {
        const song = args.join(" ");

        await sock.sendMessage(msg.key.remoteJid, {
            text: `🎵 Downloading: ${song}\n\nFeature coming soon...`
        });
    }
};
