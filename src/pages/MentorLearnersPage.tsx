import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import StatusBadge from '../components/StatusBadge'
import { getMentorLearners, formatRelativeTime } from '../utils/dashboard'
import { searchLearners } from '../utils/mockDataHelpers'
import type { Learner, LearnerStatus } from '../types'

const PAGE_SIZE = 10

type SortMode = 'default' | 'priority'

function sortByPriority(learners: Learner[]): Learner[] {
  const priority = (status: LearnerStatus) => {
    if (status === 'STUCK') return 0
    if (status === 'AT_RISK') return 1
    if (status === 'PENDING_MENTOR') return 2
    return 3
  }

  return [...learners]
    .map((learner, index) => ({ learner, index }))
    .sort((a, b) => {
      const diff = priority(a.learner.status) - priority(b.learner.status)
      return diff !== 0 ? diff : a.index - b.index
    })
    .map(({ learner }) => learner)
}

export default function MentorLearnersPage() {
  const { data } = useApp()
  const myLearners = getMentorLearners(data.learners, data.currentUser.id)
  const [page, setPage] = useState(0)
  const [sortMode, setSortMode] = useState<SortMode>('default')
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<LearnerStatus | 'ALL'>('ALL')

  const filtered = useMemo(() => {
    let list = searchLearners(myLearners, query)
    if (statusFilter !== 'ALL') {
      list = list.filter((l) => l.status === statusFilter)
    }
    return sortMode === 'priority' ? sortByPriority(list) : list
  }, [myLearners, query, statusFilter, sortMode])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const visible = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  return (
    <div>
      <h1 className="page-title">Learners</h1>
      <p className="page-subtitle">
        {myLearners.length} learners under mentor {data.currentUser.name} · Cohort total:{' '}
        {data.cohort.totalLearners} learners
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setPage(0)
          }}
          placeholder="Search learners..."
          className="min-w-[200px] flex-1 rounded-md border border-stone-300 bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
        <div className="flex items-center gap-2">
          <label htmlFor="learner-sort" className="text-sm text-stone-700">
            Sort by
          </label>
          <select
            id="learner-sort"
            value={sortMode}
            onChange={(e) => {
              setSortMode(e.target.value as SortMode)
              setPage(0)
            }}
            className="filter-select"
          >
            <option value="default">Default order</option>
            <option value="priority">Priority — stuck &amp; at risk first</option>
          </select>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as LearnerStatus | 'ALL')
            setPage(0)
          }}
          className="filter-select"
          aria-label="Filter by status"
        >
          <option value="ALL">All statuses</option>
          <option value="ON_TRACK">On track</option>
          <option value="PENDING_MENTOR">Pending mentor</option>
          <option value="AT_RISK">At risk</option>
          <option value="STUCK">Stuck</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      <div className="card mt-6 overflow-hidden border-stone-300">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-stone-300 bg-stone-50">
            <tr>
              <th className="px-4 py-3 font-medium text-stone-700">Learner</th>
              <th className="px-4 py-3 font-medium text-stone-700">Module</th>
              <th className="px-4 py-3 font-medium text-stone-700">Status</th>
              <th className="px-4 py-3 font-medium text-stone-700">Score</th>
              <th className="px-4 py-3 font-medium text-stone-700">Risk</th>
              <th className="px-4 py-3 font-medium text-stone-700">Last active</th>
              <th className="px-4 py-3 font-medium text-stone-700"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {visible.map((learner) => (
              <tr key={learner.id} className="hover:bg-stone-50">
                <td className="px-4 py-3 font-medium text-stone-900">{learner.name}</td>
                <td className="px-4 py-3 text-stone-600">{learner.currentModule}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={learner.status} />
                </td>
                <td className="px-4 py-3 text-stone-900">{learner.avgScore}</td>
                <td className="px-4 py-3 text-stone-600">{learner.dropOffRisk}</td>
                <td className="px-4 py-3 text-stone-500">
                  {formatRelativeTime(learner.lastActive)}
                </td>
                <td className="px-4 py-3">
                  <Link
                    to={`/mentor/learner/${learner.id}`}
                    className="text-accent hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 text-sm text-stone-600">
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className="disabled:opacity-40"
        >
          ‹
        </button>
        <span>{page + 1}</span>
        <button
          type="button"
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={page >= totalPages - 1}
          className="disabled:opacity-40"
        >
          ›
        </button>
      </div>
    </div>
  )
}
