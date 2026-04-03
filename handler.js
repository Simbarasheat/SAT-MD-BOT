const fs = require("fs");
const path = require("path");
const config = require("./config");

module.exports = async (sock, msg) => {
    const body = msg.message.conversation || msg.message.extendedTextMessage?.text;
    if (!body) return;

    if (!body.startsWith(config.prefix)) return;

    const args = body.slice(1).trim().split(" ");
    const command = args.shift().toLowerCase();

    const commandFiles = [];

    function readCommands(dir) {
        fs.readdirSync(dir).forEach(file => {
            const fullPath = path.join(dir, file);
            if (fs.lstatSync(fullPath).isDirectory()) {
                readCommands(fullPath);
            } else if (file.endsWith(".js")) {
                commandFiles.push(require(fullPath));
            }
        });
    }

    readCommands("./commands");

    for (let cmd of commandFiles) {
        if (cmd.name === command) {
            cmd.execute(sock, msg, args);
            break;
        }
    }
};