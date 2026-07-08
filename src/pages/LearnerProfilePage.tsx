import { useMemo } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import BackButton from '../components/BackButton'
import { resolveBackNavigation } from '../utils/taskNavigation'
import StatusBadge from '../components/StatusBadge'
import LearnerInsightChart from '../components/charts/LearnerInsightChart'
import ModuleHistoryChart from '../components/charts/ModuleHistoryChart'
import {
  formatTimestamp,
  getActivityLabel,
  getRiskColor,
  isSystemAlert,
} from '../utils/dashboard'
import type { ActivityLog } from '../types'

function MessageIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  )
}

function getActivityReviewRoute(
  log: ActivityLog,
  learnerId: string,
  submissions: { id: string; learnerId: string }[],
  reviewRequests: { id: string; learnerId: string; status: string }[]
): string | null {
  if (!log.requiresAction) return null

  if (log.type === 'MENTOR_REQUEST') {
    const open = reviewRequests.find((r) => r.learnerId === learnerId && r.status === 'OPEN')
    if (open) return `/review/${open.id}`
  }

  const submission = submissions.find((s) => s.learnerId === learnerId)
  if (submission) return `/marking/${submission.id}`

  return null
}

export default function LearnerProfilePage() {
  const { learnerId } = useParams<{ learnerId: string }>()
  const { data, reviewRequests, getSubmission } = useApp()
  const navigate = useNavigate()
  const location = useLocation()

  const learner = data.learners.find((l) => l.id === learnerId)
  const submission = learnerId ? getSubmission(learnerId) : undefined

  const logs = useMemo(
    () =>
      data.activityLogs
        .filter((log) => log.learnerId === learnerId)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    [data.activityLogs, learnerId]
  )

  const cohortAvgScore = Math.round(
    data.learners.reduce((sum, l) => sum + l.avgScore, 0) / data.learners.length
  )
  const cohortAvgEngagement = Math.round(
    data.learners.reduce((sum, l) => sum + l.engagementScore, 0) / data.learners.length
  )

  if (!learner) {
    return <p className="text-stone-500">Learner not found.</p>
  }

  const progressPct = Math.round((learner.moduleProgress / learner.totalModules) * 100)

  const completedModules = learner.moduleHistory.filter((m) => m.status === 'COMPLETED')
  const latestModule =
    learner.moduleHistory.find((m) => m.status === 'IN_PROGRESS') ??
    completedModules[completedModules.length - 1]

  const back = resolveBackNavigation(location.state, '/learners', 'Back to learners')

  return (
    <div>
      <BackButton to={back.to} label={back.label} />

      <div className="mt-6 flex flex-wrap items-start gap-6">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="page-title">{learner.name}</h1>
            <Link
              to={`/chat/${learner.id}`}
              className="rounded p-1 text-stone-600 hover:bg-stone-100 hover:text-stone-900"
              title="Message learner"
            >
              <MessageIcon />
            </Link>
          </div>
          <p className="mt-2 text-sm text-stone-600">{learner.enrollmentLabel}</p>
          <p className="text-sm text-stone-600">{learner.currentModule}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <StatusBadge status={learner.status} />
            <span className={`text-sm ${getRiskColor(learner.dropOffRisk)}`}>
              Drop-off risk: {learner.dropOffRisk}
            </span>
          </div>
        </div>
        <img
          src={learner.avatar}
          alt=""
          className="h-24 w-24 shrink-0 rounded-full border border-stone-300 object-cover sm:h-28 sm:w-28"
        />
      </div>

      <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-stone-300 bg-stone-300 sm:grid-cols-3">
        <div className="bg-white p-5 text-center">
          <p className="text-xs uppercase tracking-wide text-stone-500">Average score</p>
          <p className="mt-1 font-serif text-3xl font-semibold text-stone-900">
            {learner.avgScore}
            <span className="text-lg font-normal text-stone-500">/100</span>
          </p>
        </div>
        <div className="bg-white p-5 text-center">
          <p className="text-xs uppercase tracking-wide text-stone-500">Engagement</p>
          <p className="mt-1 font-serif text-3xl font-semibold text-stone-900">
            {learner.engagementScore}
          </p>
        </div>
        <div className="bg-white p-5 text-center">
          <p className="text-xs uppercase tracking-wide text-stone-500">Progress</p>
          <p className="mt-1 font-serif text-3xl font-semibold text-stone-900">{progressPct}%</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section className="card border-stone-300 p-6">
          <div className="section-heading">
            <h2 className="section-title">Learning snapshot</h2>
            <p className="mt-1 text-xs text-stone-500">Engagement vs performance</p>
          </div>
          <div className="mt-4">
            <LearnerInsightChart
              learner={learner}
              cohortAvgScore={cohortAvgScore}
              cohortAvgEngagement={cohortAvgEngagement}
            />
          </div>
        </section>

        <ModuleHistoryChart learner={learner} />

        <section className="card border-stone-300 p-6">
          <div className="section-heading">
            <h2 className="section-title">Skill breakdown</h2>
          </div>
          <div className="mt-4 space-y-4">
            {learner.skills.map((skill) => (
              <div key={skill.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-stone-700">{skill.name}</span>
                  <span className="text-stone-500">{skill.progress}%</span>
                </div>
                <div className="h-1.5 bg-stone-200">
                  <div className="h-full bg-accent" style={{ width: `${skill.progress}%` }} />
                </div>
              </div>
            ))}
          </div>

          {submission && (
            <div className="mt-6 border-t border-stone-200 pt-4">
              <p className="text-sm font-medium text-stone-900">{submission.moduleTitle}</p>
              <p className="mt-1 font-serif text-lg text-stone-900">
                {submission.aiScore}
                <span className="text-sm font-normal text-stone-500">/100</span>
              </p>
              <button
                type="button"
                onClick={() => navigate(`/marking/${submission.id}`)}
                className="btn-primary mt-3 w-full text-sm"
              >
                Review submission
              </button>
            </div>
          )}

          {!submission && latestModule && (
            <div className="mt-6 border-t border-stone-200 pt-4">
              <p className="text-sm text-stone-600">{latestModule.title}</p>
              {latestModule.score != null && (
                <p className="mt-1 font-serif text-lg">
                  {latestModule.score}
                  <span className="text-sm text-stone-500">/100</span>
                </p>
              )}
            </div>
          )}
        </section>

        <section className="card border-stone-300 p-6">
          <div className="section-heading">
            <h2 className="section-title">Activity log</h2>
          </div>
          <div className="mt-4 space-y-4">
            {logs.length === 0 ? (
              <p className="text-sm text-stone-400">No activity yet.</p>
            ) : (
              logs.map((log) => {
                const reviewLink =
                  learnerId &&
                  getActivityReviewRoute(
                    log,
                    learnerId,
                    data.submissions,
                    reviewRequests
                  )

                return (
                  <div
                    key={log.id}
                    className="flex gap-3 border-b border-stone-100 pb-4 last:border-0"
                  >
                    <span className="w-14 shrink-0 text-xs font-medium uppercase text-stone-500">
                      {getActivityLabel(log.type)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-xs text-stone-500">
                            {isSystemAlert(log.type) ? 'System' : 'User'}
                          </span>
                          <p className="mt-1 text-sm text-stone-800">{log.message}</p>
                          <p className="mt-1 text-xs text-stone-400">
                            {formatTimestamp(log.timestamp)}
                          </p>
                        </div>
                        {reviewLink && (
                          <Link
                            to={reviewLink}
                            className="btn-primary shrink-0 px-3 py-1 text-xs"
                          >
                            Review
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
