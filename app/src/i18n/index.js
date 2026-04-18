import enUS from './en-US'
import ptBR from './pt-BR'

const messagesByLocale = {
  'pt-BR': ptBR,
  'en-US': enUS,
}

function getMessages(locale) {
  return messagesByLocale[locale] ?? messagesByLocale['pt-BR']
}

export { getMessages, messagesByLocale }
