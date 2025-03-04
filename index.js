const { Client, GatewayIntentBits, Events } = require("discord.js");
const config = require("./config.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

const { token, members: minMembers } = config;

if (!token || typeof token !== "string") {
    console.error("Ошибка: Токен не указан или имеет неверный формат.");
    process.exit(1);
}
if (!minMembers || typeof minMembers !== "number" || minMembers < 0) {
    console.error("Ошибка: minMembers должен быть положительным числом.");
    process.exit(1);
}

client.once(Events.ClientReady, async () => {
    try {
        console.log(`Бот запущен как ${client.user.tag}. Проверка серверов началась...`);

        for (const guild of client.guilds.cache.values()) {
            const memberCount = guild.members.cache.filter(member => !member.user.bot).size;

            if (memberCount < minMembers) {
                try {
                    await guild.leave();
                    console.log(`Покинул сервер "${guild.name}" (${memberCount} участников)`);
                } catch (leaveError) {
                    console.error(`Ошибка при выходе с "${guild.name}": ${leaveError.message}`);
                }
            } else {
                console.log(`Сервер "${guild.name}" пропущен (${memberCount} участников)`);
            }
        }

        console.log("Проверка серверов завершена.");
    } catch (error) {
        console.error(`Произошла ошибка: ${error.message}`);
    } finally {
        process.exit(0);
    }
};

client.login(token).catch(error => {
    console.error(`Ошибка авторизации: ${error.message}`);
    process.exit(1);
});