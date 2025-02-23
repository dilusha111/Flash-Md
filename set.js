const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUFzN3hWNThLNW95NXJ3cStzc0dsWmlpaWwxTmVFSFlmZVNucStnQWNrND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK05LUHpUT3RPMjJGT29jQzRtSHozZ1Q4Z3cxek03M0QydllMbWtTMHZ6Yz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhQXdGTTVlY1VoQXpGcVVPSzJxM0Z6Um9GUmR0WUd2N3ZVUkl2MXRCM20wPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJiVWtLMTRyMnlwN0xzK291U3JMYVo4TlQyY1NrSEgvZis2S2dWTjZKSGdzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRNOEsxTjVSR1R1d2t4VXhtZy9McTRXeVRxN3o3eGR1L2FrVmZJMS9VSDg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlBrdExFT0RyNDRETUExVUI1SUpacmt3NTZLd0VXT2I5WjRPQTBVdGVaQVE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUVuYXhCNHQvTll3bVhuSi9NOERGeFpaMEU0Mm43QlBwVkRwcFJHZVpsYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY3F4WCtRV2FyN2IwN0FQVWNGMUVvTlJCK3hMc2tXbTRFdktMbFV1OStYRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdySDJGRDdJU2VDbndxOXA1SlhVcU1uVzJvSGc0N0pMNm1BREJlNlhVWkhaNTBydWZwNHJMbzBjcCtOQ00vVXFCNnZyTlZkNzdFbTlZU3gwQzEzSGhnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDUsImFkdlNlY3JldEtleSI6ImdZUDF4OGZ2aDQ5eWFvTkVEbzRwUmJCWndWVzRKcDRsVkp3SEw5WDVzbjA9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Il9SOU9wSnl5UVF5VGZSZ2haMGpaTVEiLCJwaG9uZUlkIjoiZTEyMTk5ZmItNThhNC00ODMzLWJhZTQtOTFiYzNlZTk2ODVmIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjQ5Tkp2b1Joc1ptY0VuYThOTkk4YTg5WDJTQT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmU0Y3cGFMc3NldVBrUFN2UzY0aFBycStjV2c9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUkczUTJYNkYiLCJtZSI6eyJpZCI6Ijk0NzcwMDgwNTgyOjQyQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLcXJ3Zm9DRU42YzdMMEdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ1dGI1TkhIRnJUMGlhcVI4eWtMUGl0dDhRNFhjekVMVXRvaGFaRXJSSXo4PSIsImFjY291bnRTaWduYXR1cmUiOiJQeVNZL3hJOFJhR2prSnZkdWpGQVRvTE4rUktKN2UxZHk1Zzh0MnBXZUpUdXpxZXRRYm8wdnNYT3AvWnh6bTF0RjFYbXpaM0h4WmsvYjMxSFZSd3hEUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiLzlyS29mM3haRlVrY1JLUnFicFNlN25qell5blZnT1RsSGszbksvNVpHaWlrVEhsUzBJTGlVMUhFRXV2WGZiSVE5TXVJdnVROXNmN1BSbWtEQ0I0alE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5NDc3MDA4MDU4Mjo0MkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJiclcrVFJ4eGEwOUltcWtmTXBDejRyYmZFT0YzTXhDMUxhSVdtUkswU00vIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQwMzEyMTcxfQ==',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "94770080582",
    AUTO_LIKE: process.env.STATUS_LIKE || "off",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    ANTIVIEW: process.env.VIEWONCE,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
