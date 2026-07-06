import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function MentorHeader() {
  const { notifications, data } = useApp()
  const location = useLocation()
  const unread = notifications.filter((n) => !n.read).length
  const onChat = location.pathname.startsWith('/mentor/chat')

  return (
    <header className="flex items-center justify-end gap-4 border-b border-stone-300 bg-paper px-6 py-3 md:px-10">
      <Link
        to="/mentor/chat"
        className={`rounded p-1.5 transition hover:bg-stone-100 ${onChat ? 'bg-stone-200' : ''}`}
        title="Chat"
        aria-label="Open chat"
      >
        <ChatIcon />
      </Link>
      <Link
        to="/mentor/notifications"
        className="relative rounded p-1.5 transition hover:bg-stone-100"
        title="Notifications"
        aria-label="Notifications"
      >
        <BellIcon />
        {unread > 0 && (
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        )}
      </Link>
      <img
        src={data.currentUser.avatar}
        alt={data.currentUser.name}
        className="h-8 w-8 rounded-full border border-stone-300 object-cover"
      />
    </header>
  )
}

function ChatIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}
