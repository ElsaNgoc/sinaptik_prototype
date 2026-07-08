import { useMemo, useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import {
  filterNotificationsByTab,
  filterNotificationsByDateWithin,
  getNotificationRoute,
  sortNotificationsByDate,
  formatBadgeCount,
  getUnreadNotificationCount,
  type NotificationDateWithin,
} from '../utils/mockDataHelpers'
import {
  getNotificationTypeStyle,
  READ_NOTIFICATION_ROW,
} from '../utils/notificationStyles'
import { NOTIFICATIONS_RETURN } from '../utils/taskNavigation'
import type { Notification } from '../types'

type InboxTab = 'ALL' | 'GRADING' | 'AI_ALERT' | 'SYSTEM'

const TABS: { id: InboxTab; label: string; dot?: string; hint?: string }[] = [
  { id: 'ALL', label: 'All' },
  {
    id: 'GRADING',
    label: 'Grading',
    dot: 'bg-amber-500',
    hint: 'Submissions & feedback requests',
  },
  { id: 'AI_ALERT', label: 'AI alerts', dot: 'bg-rose-500' },
  { id: 'SYSTEM', label: 'System', dot: 'bg-emerald-500' },
]

const DATE_WITHIN_OPTIONS: { value: NotificationDateWithin; label: string }[] = [
  { value: 'any', label: 'Any time' },
  { value: '1d', label: '1 day' },
  { value: '3d', label: '3 days' },
  { value: '1w', label: '1 week' },
  { value: '2w', label: '2 weeks' },
  { value: '1m', label: '1 month' },
  { value: '1y', label: '1 year' },
]

const DEMO_TODAY = '2026-07-06'

function formatNotificationDate(isoDate: string) {
  return new Date(isoDate + 'T12:00:00').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  })
}

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="text-stone-400"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  )
}

function NotificationRow({
  notification,
  onRead,
}: {
  notification: Notification
  onRead: (id: string) => void
}) {
  const read = notification.read
  const typeStyle = getNotificationTypeStyle(notification.type)
  const rowStyle = read ? READ_NOTIFICATION_ROW : typeStyle

  return (
    <Link
      to={getNotificationRoute(notification, notification.type)}
      state={NOTIFICATIONS_RETURN}
      onClick={() => onRead(notification.id)}
      className={`grid grid-cols-1 gap-1 border-b border-stone-200 border-l-4 px-4 py-3.5 transition last:border-b-0 hover:z-10 hover:outline hover:outline-2 hover:outline-blue-500 hover:-outline-offset-2 md:grid-cols-[minmax(140px,1fr)_2fr_auto] md:items-center md:gap-6 ${rowStyle.border} ${rowStyle.rowBg} ${rowStyle.rowBgHover}`}
    >
      <div className="flex min-w-0 items-center gap-2">
        <span
          className={`truncate text-sm ${
            read ? 'font-normal text-stone-500' : 'font-semibold text-stone-900'
          }`}
        >
          {notification.learnerName}
        </span>
        {!read && (
          <span
            className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium ${typeStyle.badge}`}
          >
            {typeStyle.label}
          </span>
        )}
      </div>
      <p className={`min-w-0 text-sm ${read ? 'text-stone-400' : 'text-stone-800'}`}>
        {notification.message}
      </p>
      <p
        className={`shrink-0 text-sm md:text-right ${
          read ? 'text-stone-400' : 'text-stone-600'
        }`}
      >
        {formatNotificationDate(notification.date)}
      </p>
    </Link>
  )
}

export default function MentorNotificationsPage() {
  const { notifications, markNotificationRead } = useApp()
  const [searchParams] = useSearchParams()
  const [tab, setTab] = useState<InboxTab>('ALL')
  const [query, setQuery] = useState('')
  const [dateWithin, setDateWithin] = useState<NotificationDateWithin>('any')
  const [anchorDate, setAnchorDate] = useState(DEMO_TODAY)

  useEffect(() => {
    const type = searchParams.get('type')
    if (type === 'AI_ALERT') setTab('AI_ALERT')
  }, [searchParams])

  const unreadCount = getUnreadNotificationCount(notifications)
  const unreadLabel = formatBadgeCount(unreadCount)
  const actionCount = notifications.filter((n) => n.requiresAction).length

  const filtered = useMemo(() => {
    let list = filterNotificationsByTab(notifications, tab)
    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (n) =>
          n.learnerName.toLowerCase().includes(q) || n.message.toLowerCase().includes(q)
      )
    }
    list = filterNotificationsByDateWithin(list, dateWithin, anchorDate)
    return sortNotificationsByDate(list)
  }, [notifications, tab, query, dateWithin, anchorDate])

  return (
    <div>
      <h1 className="page-title">Inbox</h1>
      <p className="page-subtitle">
        {unreadLabel ? (
          <>
            <span className="font-medium text-stone-900">{unreadLabel} unread</span>
            {actionCount > 0 && (
              <> · {actionCount} {actionCount === 1 ? 'item' : 'items'} require attention</>
            )}
          </>
        ) : (
          <>All caught up · {actionCount > 0 ? `${actionCount} items require attention` : 'no pending actions'}</>
        )}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <div className="relative min-w-[220px] flex-1">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search messages..."
            className="w-full rounded-md border border-stone-300 bg-white py-2.5 pl-3 pr-10 text-sm text-stone-800 placeholder:text-stone-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <SearchIcon />
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <label htmlFor="inbox-date-within" className="text-sm text-stone-700">
            Date within
          </label>
          <select
            id="inbox-date-within"
            value={dateWithin}
            onChange={(e) => {
              setDateWithin(e.target.value as NotificationDateWithin)
            }}
            className="filter-select py-2.5"
          >
            {DATE_WITHIN_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="relative">
            <input
              id="inbox-anchor-date"
              type="date"
              value={anchorDate}
              disabled={dateWithin === 'any'}
              onChange={(e) => {
                setAnchorDate(e.target.value)
              }}
              className="filter-select py-2.5 pr-9 disabled:cursor-not-allowed disabled:bg-stone-100 disabled:text-stone-400"
              aria-label="Filter anchor date"
            />
          </div>
          {dateWithin !== 'any' && (
            <button
              type="button"
              onClick={() => {
                setDateWithin('any')
                setAnchorDate(DEMO_TODAY)
              }}
              className="text-sm text-stone-500 hover:text-stone-800 hover:underline"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 border-b-2 border-stone-300">
        <nav className="-mb-0.5 flex flex-wrap gap-x-6 gap-y-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 border-b-2 pb-2.5 text-sm transition ${
                tab === t.id
                  ? 'border-stone-900 font-medium text-stone-900'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              {t.dot && (
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${t.dot}`}
                  aria-hidden
                />
              )}
              {t.label}
            </button>
          ))}
        </nav>
        {tab === 'GRADING' && (
          <p className="pb-2 text-xs text-stone-500">
            Yellow — new submissions and student feedback requests
          </p>
        )}
      </div>

      <div className="card overflow-hidden rounded-t-none border-t-0 border-stone-300">
        {filtered.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-stone-500">No notifications.</p>
        ) : (
          <div>
            {filtered.map((n) => (
              <NotificationRow
                key={n.id}
                notification={n}
                onRead={markNotificationRead}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
