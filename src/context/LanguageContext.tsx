import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { translations, type Locale } from '../i18n/translations'

const STORAGE_KEY = 'sinaptik-locale'

type Params = Record<string, string | number>

function getNested(obj: Record<string, unknown>, path: string): string | undefined {
  const value = path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, obj)
  return typeof value === 'string' ? value : undefined
}

function interpolate(template: string, params?: Params): string {
  if (!params) return template
  return Object.entries(params).reduce(
    (text, [key, value]) => text.split(`{${key}}`).join(String(value)),
    template
  )
}

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Params) => string
  dateLocale: string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readStoredLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'id') return stored
  } catch {
    // ignore
  }
  return 'en'
}

document.documentElement.lang = readStoredLocale() === 'id' ? 'id' : 'en'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale)

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore
    }
    document.documentElement.lang = next === 'id' ? 'id' : 'en'
  }, [])

  const t = useCallback(
    (key: string, params?: Params) => {
      const text =
        getNested(translations[locale] as unknown as Record<string, unknown>, key) ??
        getNested(translations.en as unknown as Record<string, unknown>, key) ??
        key
      return interpolate(text, params)
    },
    [locale]
  )

  const value = useMemo(
    (): LanguageContextValue => ({
      locale,
      setLocale,
      t,
      dateLocale: locale === 'id' ? 'id-ID' : 'en-US',
    }),
    [locale, setLocale, t]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
