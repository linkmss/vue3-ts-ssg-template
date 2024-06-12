import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { ref } from 'vue'
import { isSSR } from '@/helpers'
import type { Installable } from '@/types'

// Helpers
function removeDoubleSlash(str: string) {
  return str.replace(/(^|[^:])\/+/gm, '$1/')
}

// Types
export type Locale = string
export interface Lang {
  code: 'ru' | 'en'
  label: 'Русский' | 'English'
}

// CONFIG
export const FALLBACK_LANGUAGE = 'ru'
export const locale = ref<Lang['code']>('ru')
export const AVAILABLE_LANGUAGES: Lang[] = [
  {
    code: 'ru',
    label: 'Русский',
  },
  {
    code: 'en',
    label: 'English',
  },
]

// Create locale map from locale files
const localesMap = Object.fromEntries(
  Object.entries(import.meta.glob(`../../locales/*.json`)).map(
    ([path, loadLocale]) => [path.match(/([\w-]*)\.json$/)?.[1], loadLocale],
  ),
) as Record<Locale, () => Promise<{ default: Record<string, string> }>>
export const loadedLanguages: string[] = []
export const availableLocales = Object.keys(localesMap)
const messages = ref<Record<string, Record<string, any>>>({})

export function pathWithLocale(path: string, lang?: string) {
  const finalLang = lang || locale.value

  const prefix = path.startsWith(`/${finalLang}`) ? '' : finalLang

  return removeDoubleSlash(`/${prefix}/${path}`)
}

export function setLanguage(lang: Locale) {
  locale.value = lang as any

  if (typeof document !== 'undefined')
    document.querySelector('html')?.setAttribute('lang', lang)
}

export async function loadLanguageAsync(langCode: Lang['code']): Promise<void> {
  let finalLangCode = langCode

  if (!availableLocales.includes(langCode))
    finalLangCode = FALLBACK_LANGUAGE

  // If the language was already loaded
  if (loadedLanguages.includes(finalLangCode))
    return setLanguage(finalLangCode)

  // If the language hasn't been loaded yet
  const localMessages = await localesMap[finalLangCode]()

  messages.value[finalLangCode] = localMessages.default
  loadedLanguages.push(finalLangCode)

  return setLanguage(finalLangCode)
}

export function t(msg: string, param: Record<string, any> | null = null) {
  let val = msg.split('.').reduce((value: any, part: string) => {
    return value?.[part] || msg
  }, messages.value[locale.value])

  if (param)
    Object.keys(param).map(key => val = val.replace(new RegExp(`\\{${key}\\}`, 'g'), param[key]))

  return val
}
export function te(msg: string) {
  return msg
    .split('.')
    .reduce((value: any, part: string) => {
      return value?.[part] || msg
    }, messages.value[locale.value]) !== msg
}

function getUserLocale(route: RouteLocationNormalizedLoaded) {
  if (isSSR())
    return (route.params.locale?.toString() || FALLBACK_LANGUAGE) as Lang['code']

  const target = route.params.locale?.toString() || FALLBACK_LANGUAGE

  return (availableLocales.includes(target) ? target : FALLBACK_LANGUAGE) as Lang['code']
}

export const install: Installable = ({ router }) => {
  router.beforeEach(async (to) => {
    // detect user locale
    const targetLang = getUserLocale(to)
    // load lang
    if (!loadedLanguages.includes(targetLang))
      await loadLanguageAsync(targetLang)
  })
}
