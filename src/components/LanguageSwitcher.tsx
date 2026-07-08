import { useEffect, useRef, useState } from 'react'
import type { Locale } from '../i18n/translations'
import { useLanguage } from '../context/LanguageContext'

const LOCALE_OPTIONS: { code: Locale; short: string }[] = [
  { code: 'en', short: 'EN' },
  { code: 'id', short: 'ID' },
]

function localeOption(code: Locale) {
  return LOCALE_OPTIONS.find((o) => o.code === code) ?? LOCALE_OPTIONS[0]
}

function FlagIcon({ locale }: { locale: Locale }) {
  if (locale === 'id') {
    return (
      <svg
        width="20"
        height="14"
        viewBox="0 0 20 14"
        className="shrink-0 overflow-hidden rounded-sm border border-stone-300 shadow-sm"
        aria-hidden
      >
        <rect width="20" height="7" fill="#CE1126" />
        <rect y="7" width="20" height="7" fill="#FFFFFF" />
      </svg>
    )
  }

  return (
    <svg
      width="20"
      height="14"
      viewBox="0 0 20 14"
      className="shrink-0 overflow-hidden rounded-sm border border-stone-300 shadow-sm"
      aria-hidden
    >
      <rect width="20" height="14" fill="#B22234" />
      <rect y="1.08" width="20" height="1.08" fill="#FFFFFF" />
      <rect y="3.23" width="20" height="1.08" fill="#FFFFFF" />
      <rect y="5.38" width="20" height="1.08" fill="#FFFFFF" />
      <rect y="7.54" width="20" height="1.08" fill="#FFFFFF" />
      <rect y="9.69" width="20" height="1.08" fill="#FFFFFF" />
      <rect y="11.85" width="20" height="1.08" fill="#FFFFFF" />
      <rect width="8" height="7.54" fill="#3C3B6E" />
      <circle cx="1.6" cy="1.2" r="0.45" fill="#FFFFFF" />
      <circle cx="3.2" cy="1.2" r="0.45" fill="#FFFFFF" />
      <circle cx="4.8" cy="1.2" r="0.45" fill="#FFFFFF" />
      <circle cx="6.4" cy="1.2" r="0.45" fill="#FFFFFF" />
      <circle cx="2.4" cy="2.4" r="0.45" fill="#FFFFFF" />
      <circle cx="4" cy="2.4" r="0.45" fill="#FFFFFF" />
      <circle cx="5.6" cy="2.4" r="0.45" fill="#FFFFFF" />
      <circle cx="1.6" cy="3.6" r="0.45" fill="#FFFFFF" />
      <circle cx="3.2" cy="3.6" r="0.45" fill="#FFFFFF" />
      <circle cx="4.8" cy="3.6" r="0.45" fill="#FFFFFF" />
      <circle cx="6.4" cy="3.6" r="0.45" fill="#FFFFFF" />
      <circle cx="2.4" cy="4.8" r="0.45" fill="#FFFFFF" />
      <circle cx="4" cy="4.8" r="0.45" fill="#FFFFFF" />
      <circle cx="5.6" cy="4.8" r="0.45" fill="#FFFFFF" />
      <circle cx="1.6" cy="6" r="0.45" fill="#FFFFFF" />
      <circle cx="3.2" cy="6" r="0.45" fill="#FFFFFF" />
      <circle cx="4.8" cy="6" r="0.45" fill="#FFFFFF" />
      <circle cx="6.4" cy="6" r="0.45" fill="#FFFFFF" />
    </svg>
  )
}

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = localeOption(locale)

  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-md border border-stone-300 bg-white px-2.5 py-1.5 text-xs font-medium text-stone-700 transition hover:bg-stone-50"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('language.label')}
      >
        <FlagIcon locale={locale} />
        <span>{current.short}</span>
        <Chevron open={open} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-40 mt-1 min-w-[7.5rem] overflow-hidden rounded-md border border-stone-300 bg-white py-1 shadow-lg"
        >
          {LOCALE_OPTIONS.map((option) => (
            <li key={option.code}>
              <button
                type="button"
                role="option"
                aria-selected={locale === option.code}
                onClick={() => {
                  setLocale(option.code)
                  setOpen(false)
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition ${
                  locale === option.code
                    ? 'bg-stone-100 font-medium text-stone-900'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <FlagIcon locale={option.code} />
                <span>{option.short}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`transition-transform ${open ? 'rotate-180' : ''}`}
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
