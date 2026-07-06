import { useState, type ReactNode } from 'react'

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 text-stone-500 transition-transform ${open ? 'rotate-180' : ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

interface CollapsibleSectionProps {
  title: string
  subtitle?: string
  count?: number
  defaultOpen?: boolean
  children: ReactNode
  level?: 'course' | 'module' | 'section'
}

export default function CollapsibleSection({
  title,
  subtitle,
  count,
  defaultOpen = false,
  children,
  level = 'section',
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  const titleClass =
    level === 'course'
      ? 'text-sm font-semibold text-stone-900'
      : level === 'module'
        ? 'text-sm font-medium text-stone-800'
        : 'text-sm font-semibold text-stone-900'

  return (
    <div className={level === 'module' ? 'ml-2 border-l border-stone-200 pl-3' : ''}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 rounded-md py-2 text-left hover:bg-stone-50"
        aria-expanded={open}
      >
        <Chevron open={open} />
        <span className={`min-w-0 flex-1 ${titleClass}`}>{title}</span>
        {count !== undefined && (
          <span className="shrink-0 text-xs text-stone-500">{count}</span>
        )}
      </button>
      {subtitle && !open && (
        <p className="mb-1 ml-6 truncate text-xs text-stone-500">{subtitle}</p>
      )}
      {open && <div className="pb-2 pl-6">{children}</div>}
    </div>
  )
}
