import { type ReactNode, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import {
  groupLearnersByColumn,
  getMentorLearners,
  formatRelativeTime,
} from '../utils/dashboard'
import { getMentorDashboardKpis, getTaskRoute } from '../utils/mockDataHelpers'
import { TASKS_RETURN } from '../utils/taskNavigation'
import StatCard from '../components/StatCard'
import StatusBadge from '../components/StatusBadge'
import type { Learner, MentorTask } from '../types'

const PREVIEW_LIMIT = 5

function pendingTasksSorted(tasks: MentorTask[]) {
  return [...tasks]
    .filter((t) => t.status === 'PENDING')
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
}

export default function MentorDashboardPage() {
  const { data, tasks } = useApp()
  const { cohort, learners, currentUser } = data
  const kpis = getMentorDashboardKpis(cohort)

  const myLearners = getMentorLearners(learners, currentUser.id)
  const grouped = groupLearnersByColumn(myLearners)
  const pendingWork = useMemo(() => pendingTasksSorted(tasks), [tasks])
  const workPreview = pendingWork.slice(0, PREVIEW_LIMIT)
  const followUpPreview = grouped.stuck.slice(0, PREVIEW_LIMIT)

  return (
    <div>
      <h1 className="page-title">Good morning, {currentUser.name.split(' ')[0]}</h1>
      <p className="page-subtitle">{cohort.name}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <StatCard label="Your learners" value={myLearners.length} />
        <StatCard label="Cohort completion" value={kpis.completionRate} suffix="%" />
        <StatCard label="Average score" value={kpis.averageScore} suffix="/100" />
      </div>

      <section className="mt-10">
        <h2 className="section-title">Who needs you?</h2>
        <p className="mt-2 max-w-2xl text-sm text-stone-600">
          Morning preview — full lists live in <Link to="/mentor/tasks" className="text-accent hover:underline">Tasks</Link> and{' '}
          <Link to="/mentor/learners" className="text-accent hover:underline">Learners</Link>.
        </p>

        <div className="mt-6 space-y-6">
          <ActionPanel
            kind="work"
            title="Work queue — grade or respond"
            subtitle="Submissions waiting for you"
            count={pendingWork.length}
            previewCount={workPreview.length}
            viewAllTo="/mentor/tasks"
            viewAllLabel="Open Tasks"
            emptyText="No tasks waiting for you."
          >
            {workPreview.map((task) => (
              <WorkRow
                key={task.id}
                task={task}
                learner={myLearners.find((l) => l.id === task.learnerId)}
              />
            ))}
          </ActionPanel>

          <ActionPanel
            kind="followup"
            title="Follow up — check in or message"
            subtitle="At risk or stuck — no grading task"
            count={grouped.stuck.length}
            previewCount={followUpPreview.length}
            viewAllTo="/mentor/learners?board=stuck"
            viewAllLabel="All at risk & stuck"
            emptyText="No learners flagged for follow-up."
          >
            {followUpPreview.map((learner) => (
              <FollowUpRow key={learner.id} learner={learner} />
            ))}
          </ActionPanel>
        </div>
      </section>
    </div>
  )
}

function ActionPanel({
  kind,
  title,
  subtitle,
  count,
  previewCount,
  viewAllTo,
  viewAllLabel,
  emptyText,
  children,
}: {
  kind: 'work' | 'followup'
  title: string
  subtitle: string
  count: number
  previewCount: number
  viewAllTo: string
  viewAllLabel: string
  emptyText: string
  children: ReactNode
}) {
  const border =
    kind === 'work' ? 'border-l-amber-400 bg-amber-50/40' : 'border-l-red-400 bg-red-50/40'
  const overflow = count - previewCount

  return (
    <div className={`rounded-lg border border-stone-200 border-l-4 ${border}`}>
      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-stone-200/80 px-4 py-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-stone-900">{title}</h3>
            <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-stone-600 ring-1 ring-stone-200">
              {count}
            </span>
          </div>
          <p className="mt-1 text-xs text-stone-600">{subtitle}</p>
        </div>
        {count > 0 && (
          <Link to={viewAllTo} className="shrink-0 text-xs text-accent hover:underline">
            {viewAllLabel} →
          </Link>
        )}
      </div>
      <div className="divide-y divide-stone-200/80">
        {count === 0 ? (
          <p className="px-4 py-6 text-center text-sm text-stone-400">{emptyText}</p>
        ) : (
          children
        )}
      </div>
      {overflow > 0 && (
        <p className="border-t border-stone-200/80 px-4 py-2 text-center text-xs text-stone-500">
          +{overflow} more in{' '}
          <Link to={viewAllTo} className="text-accent hover:underline">
            {viewAllLabel.toLowerCase()}
          </Link>
        </p>
      )}
    </div>
  )
}

function WorkRow({ task, learner }: { task: MentorTask; learner?: Learner }) {
  const isReview = task.type === 'REVIEW_REQUEST'
  const to = getTaskRoute(task)
  const cta = isReview ? 'Review →' : 'Mark →'

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to={learner ? `/mentor/learner/${learner.id}` : '#'}
            className="font-medium text-stone-900 hover:underline"
          >
            {task.learnerName}
          </Link>
          <span
            className={`inline-flex border px-2 py-0.5 text-xs font-medium ${
              isReview
                ? 'border-amber-400 bg-amber-100 text-amber-950'
                : 'border-stone-400 bg-stone-100 text-stone-800'
            }`}
          >
            {isReview ? 'Review request' : 'New submission'}
          </span>
        </div>
        <p className="mt-1 text-xs text-stone-600">
          {task.assignmentTitle} · {task.moduleTitle}
        </p>
      </div>
      <Link
        to={to}
        state={TASKS_RETURN}
        className="shrink-0 rounded border border-amber-500 bg-white px-3 py-1.5 text-xs font-medium text-amber-900 hover:bg-amber-50"
      >
        {cta}
      </Link>
    </div>
  )
}

function FollowUpRow({ learner }: { learner: Learner }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to={`/mentor/learner/${learner.id}`}
            className="font-medium text-stone-900 hover:underline"
          >
            {learner.name}
          </Link>
          <StatusBadge status={learner.status} />
        </div>
        <p className="mt-1 text-xs text-stone-600">
          {learner.currentModule} · Risk {learner.dropOffRisk} ·{' '}
          {formatRelativeTime(learner.lastActive)}
        </p>
      </div>
      <Link
        to={`/mentor/chat/${learner.id}`}
        className="shrink-0 rounded border border-red-400 bg-white px-3 py-1.5 text-xs font-medium text-red-900 hover:bg-red-50"
      >
        Message →
      </Link>
    </div>
  )
}
