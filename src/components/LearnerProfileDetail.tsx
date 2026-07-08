import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import StatusBadge from './StatusBadge'
import LearnerInsightChart from './charts/LearnerInsightChart'
import ModuleHistoryChart from './charts/ModuleHistoryChart'
import {
  formatTimestamp,
  getActivityLabel,
  getRiskColor,
} from '../utils/dashboard'
import type { ActivityLog, Learner } from '../types'

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

interface LearnerProfileDetailProps {
  learner: Learner
  logs: ActivityLog[]
  compact?: boolean
}

export default function LearnerProfileDetail({ learner, logs, compact = false }: LearnerProfileDetailProps) {
  const { data, reviewRequests, getSubmission } = useApp()
  const navigate = useNavigate()
  const submission = getSubmission(learner.id)

  const cohortAvgScore = Math.round(
    data.learners.reduce((sum, l) => sum + l.avgScore, 0) / data.learners.length
  )
  const cohortAvgEngagement = Math.round(
    data.learners.reduce((sum, l) => sum + l.engagementScore, 0) / data.learners.length
  )

  const progressPct = Math.round((learner.moduleProgress / learner.totalModules) * 100)
  const completedModules = learner.moduleHistory.filter((m) => m.status === 'COMPLETED')
  const latestModule =
    learner.moduleHistory.find((m) => m.status === 'IN_PROGRESS') ??
    completedModules[completedModules.length - 1]

  return (
    <div className={compact ? 'space-y-4' : 'space-y-6'}>
      <div className="flex items-start gap-4">
        <img
          src={learner.avatar}
          alt=""
          className="h-16 w-16 shrink-0 rounded-full border border-stone-300 object-cover"
        />
        <div className="min-w-0">
          <h2 className="font-serif text-xl font-semibold text-stone-900">{learner.name}</h2>
          <p className="mt-1 text-sm text-stone-600">{learner.enrollmentLabel}</p>
          <p className="text-sm text-stone-600">{learner.currentModule}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <StatusBadge status={learner.status} />
            <span className={`text-xs ${getRiskColor(learner.dropOffRisk)}`}>
              Drop-off: {learner.dropOffRisk}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-stone-300 bg-stone-300">
        <div className="bg-white p-3 text-center">
          <p className="text-[10px] uppercase tracking-wide text-stone-500">Avg score</p>
          <p className="mt-1 font-serif text-xl font-semibold text-stone-900">
            {learner.avgScore}
            <span className="text-xs font-normal text-stone-500">/100</span>
          </p>
        </div>
        <div className="bg-white p-3 text-center">
          <p className="text-[10px] uppercase tracking-wide text-stone-500">Engagement</p>
          <p className="mt-1 font-serif text-xl font-semibold text-stone-900">
            {learner.engagementScore}
          </p>
        </div>
        <div className="bg-white p-3 text-center">
          <p className="text-[10px] uppercase tracking-wide text-stone-500">Progress</p>
          <p className="mt-1 font-serif text-xl font-semibold text-stone-900">{progressPct}%</p>
        </div>
      </div>

      <section className="rounded-lg border border-stone-300 bg-white p-4">
        <h3 className="text-sm font-medium text-stone-900">Learning snapshot</h3>
        <div className="mt-3">
          <LearnerInsightChart
            learner={learner}
            cohortAvgScore={cohortAvgScore}
            cohortAvgEngagement={cohortAvgEngagement}
          />
        </div>
      </section>

      <ModuleHistoryChart learner={learner} />

      <section className="rounded-lg border border-stone-300 bg-white p-4">
        <h3 className="text-sm font-medium text-stone-900">Skill breakdown</h3>
        <div className="mt-3 space-y-3">
          {learner.skills.map((skill) => (
            <div key={skill.name}>
              <div className="mb-1 flex justify-between text-xs">
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
          <div className="mt-4 border-t border-stone-200 pt-3">
            <p className="text-xs font-medium text-stone-900">{submission.moduleTitle}</p>
            <p className="mt-1 font-serif text-lg text-stone-900">
              {submission.aiScore}
              <span className="text-xs font-normal text-stone-500">/100</span>
            </p>
            <button
              type="button"
              onClick={() => navigate(`/marking/${submission.id}`)}
              className="btn-primary mt-2 w-full text-xs"
            >
              Review submission
            </button>
          </div>
        )}

        {!submission && latestModule && (
          <div className="mt-4 border-t border-stone-200 pt-3">
            <p className="text-xs text-stone-600">{latestModule.title}</p>
            {latestModule.score != null && (
              <p className="mt-1 font-serif text-lg">
                {latestModule.score}
                <span className="text-xs text-stone-500">/100</span>
              </p>
            )}
          </div>
        )}
      </section>

      <section className="rounded-lg border border-stone-300 bg-white p-4">
        <h3 className="text-sm font-medium text-stone-900">Activity log</h3>
        <div className="mt-3 space-y-3">
          {logs.length === 0 ? (
            <p className="text-xs text-stone-400">No activity yet.</p>
          ) : (
            logs.slice(0, compact ? 4 : undefined).map((log) => {
              const reviewLink = getActivityReviewRoute(
                log,
                learner.id,
                data.submissions,
                reviewRequests
              )

              return (
                <div
                  key={log.id}
                  className="flex gap-2 border-b border-stone-100 pb-3 last:border-0"
                >
                  <span className="w-12 shrink-0 text-[10px] font-medium uppercase text-stone-500">
                    {getActivityLabel(log.type)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-stone-800">{log.message}</p>
                    <p className="mt-0.5 text-[10px] text-stone-400">
                      {formatTimestamp(log.timestamp)}
                    </p>
                    {reviewLink && (
                      <Link to={reviewLink} className="mt-1 inline-block text-xs text-accent hover:underline">
                        Review
                      </Link>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </section>

      {compact && (
        <Link
          to={`/learners/${learner.id}`}
          className="block text-center text-sm text-accent hover:underline"
        >
          Open full profile
        </Link>
      )}
    </div>
  )
}
