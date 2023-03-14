const { Client, GatewayIntentBits } = require('discord.js')
const TelegramBot = require('node-telegram-bot-api')
const intents = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMembers,
]
const discordClient = new Client({ intents })
const telegramClient = new TelegramBot('YOUR TELEGRAM API BOT TOKEN')

discordClient.on('messageCreate', async function (message) {
  const channelId = 'YOUR DISCORD CHANNEL'
  if (message.channelId === channelId && message.author.bot != 1) {
    const chatId = 'YOUR TELEGRAM CHANNEL'
    console.log(`<b>🟣 ${message.author.username}:</b> ${message.content}`)
    await telegramClient.sendMessage(
      chatId,
      `<b>🟣 ${message.author.username}:</b> ${message.content}`,
      { parse_mode: 'HTML' }
    )
  }
})

telegramClient.on('message', async function (message) {
  const chatId = 'YOUR TELEGRAM CHANNEL'
  if (message.chat.id.toString() === chatId) {
    console.log(`**🔵 ${message.from.first_name}:** ${message.text}`)
    const channelId = 'YOUR DISCORD CHANNEL'
    const channel = await discordClient.channels.fetch(channelId)
    await channel.send(`**🔵 ${message.from.first_name}:** ${message.text}`)
  }
})

discordClient.login('YOUR DISCORD BOT TOKEN')
telegramClient.startPolling()

process.on('SIGINT', () => {
  discordClient.destroy()
  telegramClient.stopPolling()
})
