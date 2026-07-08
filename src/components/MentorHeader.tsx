import { Link, useLocation } from 'react-router-dom'

import { useApp } from '../context/AppContext'

import { formatBadgeCount, getUnreadChatCount } from '../utils/mockDataHelpers'

import NotificationBell from './NotificationBell'



function IconBadge({ label }: { label: string }) {

  return (

    <span className="absolute -right-1 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold leading-none text-white">

      {label}

    </span>

  )

}



export default function MentorHeader() {

  const { data, conversations } = useApp()

  const location = useLocation()

  const onChat = location.pathname.startsWith('/mentor/chat')

  const chatBadge = formatBadgeCount(getUnreadChatCount(conversations))



  return (

    <header className="flex items-center justify-end gap-4 border-b border-stone-300 bg-paper px-6 py-3 md:px-10">

      <Link

        to="/mentor/chat"

        className={`relative rounded p-1.5 transition hover:bg-stone-100 ${onChat ? 'bg-stone-200' : ''}`}

        title="Chat"

        aria-label={chatBadge ? `Open chat, ${chatBadge} unread` : 'Open chat'}

      >

        <ChatIcon />

        {chatBadge && <IconBadge label={chatBadge} />}

      </Link>

      <NotificationBell />

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

