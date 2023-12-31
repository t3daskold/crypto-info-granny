import { bot } from '@/helpers/bot'
import { ignoreOldMessageUpdates } from '@/middlewares/ignoreOldMessageUpdates'
import { sendHelp } from '@/handlers/sendHelp'
import { i18n, attachI18N } from '@/helpers/i18n'
import { setLanguage, sendLanguage } from '@/handlers/language'
import { attachUser } from '@/middlewares/attachUser'
import { localeActions } from '@/handlers/language'
import { sendReturns } from '@/handlers/sendReturns'
import { sendSubscription } from '@/handlers/sendSubscription'

export function startBot() {
  // Middlewares
  bot.use(ignoreOldMessageUpdates)
  bot.use(attachUser)
  bot.use(i18n.middleware(), attachI18N)
  // Commands
  bot.start(sendHelp)
  bot.help(sendHelp)
  bot.command('privacy', (ctx) => ctx.reply('https://privacy.borodutch.com'))
  bot.command('terms', (ctx) => ctx.reply('https://terms.borodutch.com'))
  bot.command('returns', sendReturns)
  bot.command('language', sendLanguage)
  bot.command('subscription', sendSubscription)
  // Actions
  bot.action(localeActions, setLanguage)
  bot.action('subscription', sendSubscription)
  // Errors
  bot.catch(console.error)
  // Start bot
  bot.launch().then(() => {
    console.info(`Bot ${bot.botInfo.username} is up and running`)
  })
}
