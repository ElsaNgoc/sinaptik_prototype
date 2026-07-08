import { useLanguage } from '../context/LanguageContext'
import type { AiMarkingSuggestion } from '../types'

interface AiMarkingPanelProps {
  suggestion: AiMarkingSuggestion
  maxScore: number
  accepted: boolean
  onAccept: () => void
}

export default function AiMarkingPanel({
  suggestion,
  maxScore,
  accepted,
  onAccept,
}: AiMarkingPanelProps) {
  const { t } = useLanguage()

  return (
    <aside className="rounded-lg border border-amber-300 bg-amber-50/50 p-4 lg:sticky lg:top-4">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex items-center gap-1 rounded-md bg-amber-500 px-2 py-0.5 text-xs font-semibold text-white">
          <span aria-hidden>✨</span> {t('aiMarking.title')}
        </span>
        <p className="font-serif text-xl font-semibold text-stone-900">
          {suggestion.score}
          <span className="text-sm font-normal text-stone-500"> / {maxScore}</span>
        </p>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-stone-700">{suggestion.feedback}</p>

      <button
        type="button"
        onClick={onAccept}
        disabled={accepted}
        className={`mt-4 w-full rounded-md px-4 py-2.5 text-sm font-medium transition ${
          accepted
            ? 'cursor-default border border-emerald-400 bg-emerald-50 text-emerald-800'
            : 'border border-amber-500 bg-amber-500 text-white hover:bg-amber-600'
        }`}
      >
        {accepted ? t('aiMarking.applied') : t('aiMarking.accept')}
      </button>

      <p className="mt-2 text-xs text-stone-500">{t('aiMarking.hint')}</p>
    </aside>
  )
}
