import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { filterNotificationsByTab, getNotificationRoute } from '../utils/mockDataHelpers'

type Tab = 'ALL' | 'MENTOR_REQUEST' | 'ASSIGNMENT_SUBMISSION'

const TABS: { id: Tab; label: string }[] = [
  { id: 'ALL', label: 'All notification' },
  { id: 'MENTOR_REQUEST', label: 'Mentor request' },
  { id: 'ASSIGNMENT_SUBMISSION', label: 'Assignment submission' },
]

export default function MentorNotificationsPage() {
  const { notifications } = useApp()
  const [tab, setTab] = useState<Tab>('ALL')
  const [query, setQuery] = useState('')

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
    return list
  }, [notifications, tab, query])

  return (
    <div>
      <h1 className="page-title">Inbox</h1>
      <p className="page-subtitle">{actionCount} items require attention</p>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <div className="relative min-w-[200px] flex-1">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search messages..."
            className="w-full rounded-md border border-stone-300 bg-white py-2 pl-3 pr-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="inbox-sort" className="text-sm text-stone-700">
            Sort by
          </label>
          <select id="inbox-sort" className="filter-select" defaultValue="default">
            <option value="default">Default order</option>
          </select>
        </div>
      </div>

      <div className="mt-6 border-b border-stone-300">
        <nav className="-mb-px flex gap-6">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`border-b-2 pb-2 text-sm capitalize transition ${
                tab === t.id
                  ? 'border-stone-900 font-medium text-stone-900'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="card mt-0 overflow-hidden rounded-t-none border-stone-300">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-stone-300 bg-stone-50">
            <tr>
              <th className="px-4 py-3 font-medium text-stone-700">Name</th>
              <th className="px-4 py-3 font-medium text-stone-700">Notification message</th>
              <th className="px-4 py-3 font-medium text-stone-700">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {filtered.map((n) => (
              <tr key={n.id} className={`hover:bg-stone-50 ${!n.read ? 'bg-white' : ''}`}>
                <td className="px-4 py-3 font-medium text-stone-900">{n.learnerName}</td>
                <td className="px-4 py-3 text-stone-700">
                  <Link
                    to={getNotificationRoute(n, n.type)}
                    className="hover:text-accent hover:underline"
                  >
                    {n.message}
                  </Link>
                </td>
                <td className="px-4 py-3 text-stone-500">
                  {new Date(n.date + 'T12:00:00').toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-stone-500">No notifications.</p>
        )}
      </div>
    </div>
  )
}
