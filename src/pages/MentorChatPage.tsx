import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import BackButton from '../components/BackButton'
import { buildChatLearnerList } from '../utils/mockDataHelpers'

function ChatHeaderIcons() {
  const { notifications } = useApp()
  const unread = notifications.filter((n) => !n.read).length
  return (
    <div className="flex items-center gap-3">
      <Link to="/mentor/chat" className="rounded p-1.5 bg-stone-200" aria-label="Chat">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </Link>
      <Link to="/mentor/notifications" className="relative rounded p-1.5 hover:bg-stone-100" aria-label="Notifications">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {unread > 0 && <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />}
      </Link>
    </div>
  )
}

export default function MentorChatPage() {
  const { data, conversations } = useApp()
  const { learnerId: paramLearnerId } = useParams<{ learnerId?: string }>()

  const learnerList = useMemo(
    () => buildChatLearnerList(conversations, data.learners.filter((l) => l.assignedMentor.id === data.currentUser.id)),
    [conversations, data.learners, data.currentUser.id]
  )

  const activeId = paramLearnerId ?? conversations[0]?.learnerId ?? learnerList[0]?.learnerId
  const activeConversation = conversations.find((c) => c.learnerId === activeId)
  const activeLearner = data.learners.find((l) => l.id === activeId)

  const [draft, setDraft] = useState('')

  const headerLabel =
    activeConversation?.courseLabel ?? activeLearner?.enrollmentLabel ?? 'Learner chat'

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <div className="flex items-center gap-4 border-b border-stone-300 px-4 py-3 md:px-6">
        <BackButton to="/mentor" label="Back to dashboard" />
        <h1 className="font-serif text-lg font-semibold text-stone-900">Chatbox</h1>
        <div className="ml-auto">
          <ChatHeaderIcons />
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        <aside className="w-64 shrink-0 overflow-y-auto border-r border-stone-300 bg-stone-50">
          <p className="border-b border-stone-200 px-4 py-3 text-xs font-medium uppercase tracking-wide text-stone-500">
            Learners
          </p>
          <ul>
            {learnerList.map((item) => {
              const active = item.learnerId === activeId
              return (
                <li key={item.learnerId}>
                  <Link
                    to={`/mentor/chat/${item.learnerId}`}
                    className={`flex gap-3 border-l-2 px-3 py-3 transition ${
                      active
                        ? 'border-stone-900 bg-white'
                        : 'border-transparent hover:bg-stone-100'
                    }`}
                  >
                    <img
                      src={`https://i.pravatar.cc/150?u=${item.learnerId}`}
                      alt=""
                      className="h-9 w-9 shrink-0 rounded-full border border-stone-300"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-stone-900">{item.name}</p>
                      <p className="truncate text-xs text-stone-500">{item.courseLabel}</p>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          {activeConversation ? (
            <>
              <div className="flex items-center gap-3 border-b border-stone-200 px-6 py-4">
                <img
                  src={`https://i.pravatar.cc/150?u=${activeConversation.learnerId}`}
                  alt=""
                  className="h-10 w-10 rounded-full border border-stone-300"
                />
                <div>
                  <p className="font-medium text-stone-900">{activeConversation.learnerName}</p>
                  <p className="text-xs text-stone-500">{headerLabel}</p>
                </div>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
                {activeConversation.messages.map((msg) => {
                  const isMentor = msg.senderRole === 'MENTOR'
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isMentor ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-lg rounded-lg px-4 py-2.5 text-sm leading-relaxed ${
                          isMentor
                            ? 'bg-stone-200 text-stone-900'
                            : 'border border-stone-300 bg-white text-stone-800'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="border-t border-stone-300 p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Type message.."
                    className="flex-1 rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <button type="button" className="btn-primary px-3" aria-label="Send">
                    →
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center text-sm text-stone-500">
              Select a learner to view messages.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
