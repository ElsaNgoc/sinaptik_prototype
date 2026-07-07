import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { getNotificationRoute, getRecentNotifications, formatBadgeCount, getUnreadNotificationCount } from '../utils/mockDataHelpers'
import { getNotificationTypeStyle, READ_NOTIFICATION_ROW } from '../utils/notificationStyles'
import { NOTIFICATIONS_RETURN } from '../utils/taskNavigation'
import type { Notification } from '../types'

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

function formatNotificationDate(isoDate: string) {
  return new Date(isoDate + 'T12:00:00').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  })
}

export default function NotificationBell() {
  const { notifications, markNotificationRead } = useApp()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const unread = getUnreadNotificationCount(notifications)
  const unreadBadge = formatBadgeCount(unread)
  const recent = getRecentNotifications(notifications, 5)

  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const handleSelect = (notification: Notification) => {
    markNotificationRead(notification.id)
    setOpen(false)
    navigate(getNotificationRoute(notification, notification.type), {
      state: NOTIFICATIONS_RETURN,
    })
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="relative rounded p-1.5 transition hover:bg-stone-100"
        title="Notifications"
        aria-label={unreadBadge ? `Notifications, ${unreadBadge} unread` : 'Notifications'}
        aria-expanded={open}
      >
        <BellIcon />
        {unreadBadge && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold leading-none text-white">
            {unreadBadge}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-md border border-stone-300 bg-white shadow-lg">
          <div className="border-b border-stone-200 px-4 py-2.5">
            <p className="text-sm font-medium text-stone-900">
              Notifications
              {unreadBadge ? (
                <span className="ml-2 font-normal text-stone-500">({unreadBadge} unread)</span>
              ) : (
                <span className="ml-2 font-normal text-stone-400">(all read)</span>
              )}
            </p>
          </div>

          {recent.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-stone-500">No notifications.</p>
          ) : (
            <ul className="max-h-80 divide-y divide-stone-100 overflow-y-auto">
              {recent.map((n) => {
                const typeStyle = getNotificationTypeStyle(n.type)
                const rowStyle = n.read ? READ_NOTIFICATION_ROW : typeStyle
                return (
                <li key={n.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(n)}
                    className={`w-full border-l-4 px-4 py-3 text-left transition ${rowStyle.border} ${rowStyle.rowBg} ${
                      n.read ? 'hover:bg-stone-50' : 'hover:brightness-95'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <p className={`text-sm font-medium ${n.read ? 'text-stone-500' : 'text-stone-900'}`}>
                        {n.learnerName}
                      </p>
                      {!n.read && (
                        <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${typeStyle.badge}`}>
                          {typeStyle.label}
                        </span>
                      )}
                    </div>
                    <p className={`mt-0.5 line-clamp-2 text-xs ${n.read ? 'text-stone-400' : 'text-stone-700'}`}>
                      {n.message}
                    </p>
                    <p className="mt-1 text-xs text-stone-400">{formatNotificationDate(n.date)}</p>
                  </button>
                </li>
              )})}
            </ul>
          )}

          <button
            type="button"
            onClick={() => {
              setOpen(false)
              navigate('/mentor/notifications')
            }}
            className="w-full border-t border-stone-200 py-2.5 text-sm font-medium text-accent transition hover:bg-stone-50"
          >
            More
          </button>
        </div>
      )}
    </div>
  )
}
