import { NavLink, Outlet } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { SidebarProvider, useSidebar } from '../context/SidebarContext'

export interface SidebarNavItem {
  to: string
  label: string
  end?: boolean
  badge?: string
}

interface SidebarShellProps {
  title?: string
  logoSrc?: string
  logoAlt?: string
  subtitle: string
  navItems: SidebarNavItem[]
  user: { name: string; avatar: string; role: string }
  header?: React.ReactNode
  footer?: React.ReactNode
  belowTitle?: React.ReactNode
}

export default function SidebarShell(props: SidebarShellProps) {
  return (
    <SidebarProvider>
      <SidebarShellInner {...props} />
    </SidebarProvider>
  )
}

function SidebarShellInner({
  title = 'Sinaptik',
  logoSrc,
  logoAlt,
  subtitle,
  navItems,
  user,
  header,
  footer,
  belowTitle,
}: SidebarShellProps) {
  const { isOpen, close } = useSidebar()
  const { t } = useLanguage()

  return (
    <div className="flex min-h-screen bg-paper">
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-stone-900/20 md:hidden"
          aria-label={t('nav.closeMenu')}
          onClick={close}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex shrink-0 flex-col border-r border-stone-300 bg-stone-100 transition-all duration-200 ease-in-out ${
          isOpen
            ? 'w-60 translate-x-0 md:static'
            : 'w-60 -translate-x-full md:static md:w-0 md:translate-x-0 md:overflow-hidden md:border-r-0'
        }`}
      >
        <div className="flex items-start justify-between gap-2 border-b border-stone-300 px-5 py-6">
          <div className="min-w-0 flex-1">
            {logoSrc ? (
              <img
                src={logoSrc}
                alt={logoAlt ?? title}
                className="h-8 w-auto max-w-full object-contain object-left mix-blend-multiply"
              />
            ) : (
              <h1 className="font-serif text-lg font-semibold tracking-tight text-stone-900">
                {title}
              </h1>
            )}
            {belowTitle ?? <p className="mt-0.5 text-xs text-stone-600">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={close}
            className="shrink-0 rounded p-1 text-stone-500 transition hover:bg-stone-200 hover:text-stone-900"
            aria-label={t('nav.closeMenu')}
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-0.5">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  onClick={() => {
                    if (window.matchMedia('(max-width: 767px)').matches) close()
                  }}
                  className={({ isActive }) =>
                    `flex items-center justify-between border-l-2 px-3 py-2 text-sm transition ${
                      isActive
                        ? 'border-accent bg-white font-medium text-stone-900'
                        : 'border-transparent text-stone-600 hover:border-stone-400 hover:bg-stone-50 hover:text-stone-900'
                    }`
                  }
                >
                  {item.label}
                  {item.badge && (
                    <span className="rounded-full bg-stone-200 px-1.5 py-0.5 text-xs font-medium tabular-nums text-stone-700">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-stone-300 px-5 py-4">
          <p className="text-sm font-medium text-stone-900">{user.name}</p>
          <p className="text-xs text-stone-600">{user.role}</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {header}
        <main className="flex-1 px-6 py-8 md:px-10 md:py-10">
          <Outlet />
        </main>
        {footer && (
          <footer className="border-t border-stone-300 px-6 py-4 text-sm text-stone-600 md:px-10">
            {footer}
          </footer>
        )}
      </div>
    </div>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  )
}
