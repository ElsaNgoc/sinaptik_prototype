import { Link, useNavigate } from 'react-router-dom'

import { useApp } from '../context/AppContext'

import { useLanguage } from '../context/LanguageContext'

import StatusBadge from './StatusBadge'

import LearnerInsightChart from './charts/LearnerInsightChart'

import ModuleHistoryChart from './charts/ModuleHistoryChart'

import {
  formatTimestamp,
  getActivityLabel,
  getRiskColor,
} from '../utils/dashboard'
import {
  localizeCohortLabel,
  localizeDropOffRisk,
  localizeLearnerModules,
  localizeModuleTitle,
  localizeActivityLogMessage,
} from '../i18n/localize'

import type { ActivityLog, Learner, ReviewRequest, Submission } from '../types'

function getActivityReviewRoute(
  log: ActivityLog,
  learnerId: string,
  submissions: Submission[],
  reviewRequests: ReviewRequest[]
): string | null {
  if (!log.requiresAction) return null

  if (log.reviewRequestId) {
    const request = reviewRequests.find(
      (r) => r.id === log.reviewRequestId && r.status === 'OPEN'
    )
    if (request) return `/review/${request.id}`
  }

  if (log.type === 'MENTOR_REQUEST') {
    const open = reviewRequests.find((r) => r.learnerId === learnerId && r.status === 'OPEN')
    if (open) return `/review/${open.id}`
  }

  if (log.submissionId) {
    return `/marking/${log.submissionId}`
  }

  if (log.type === 'SUBMISSION') {
    const pending = submissions.find((s) => s.learnerId === learnerId && !s.mentorMarkedAt)
    if (pending) return `/marking/${pending.id}`
    const latest = submissions.find((s) => s.learnerId === learnerId)
    if (latest) return `/marking/${latest.id}`
  }

  return null
}

interface LearnerProfileDetailProps {
  learner: Learner
  logs: ActivityLog[]
  compact?: boolean
}

export default function LearnerProfileDetail({ learner, logs, compact = false }: LearnerProfileDetailProps) {
  const { data, reviewRequests, getSubmissionsForLearner } = useApp()

  const { t, dateLocale, locale } = useLanguage()

  const navigate = useNavigate()

  const learnerSubmissions = getSubmissionsForLearner(learner.id)
  const pendingSubmissions = learnerSubmissions.filter((s) => !s.mentorMarkedAt)
  const pendingSubmissionIds = new Set(pendingSubmissions.map((s) => s.id))
  const reviewedSubmissions = learnerSubmissions.filter((s) => !pendingSubmissionIds.has(s.id))
  const openReviewRequests = reviewRequests.filter(
    (r) => r.learnerId === learner.id && r.status === 'OPEN'
  )

  const cohortAvgScore = Math.round(
    data.learners.reduce((sum, l) => sum + l.avgScore, 0) / data.learners.length
  )
  const cohortAvgEngagement = Math.round(
    data.learners.reduce((sum, l) => sum + l.engagementScore, 0) / data.learners.length
  )

  const progressPct = Math.round((learner.moduleProgress / learner.totalModules) * 100)
  const moduleHistory = learner.moduleHistory ?? []
  const localizedModules = localizeLearnerModules(moduleHistory, locale)
  const localizedLearner = {
    ...learner,
    moduleHistory: localizedModules,
  }

  const chartPanels = (
    <>
      <section className="rounded-lg border border-stone-300 bg-white p-4">
        <h3 className="text-sm font-medium text-stone-900">{t('profile.learningSnapshot')}</h3>
        <div className="mt-3">
          <LearnerInsightChart
            learner={localizedLearner}
            cohortAvgScore={cohortAvgScore}
            cohortAvgEngagement={cohortAvgEngagement}
          />
        </div>
      </section>
      <ModuleHistoryChart learner={localizedLearner} />
    </>
  )

  return (
    <div className={compact ? 'space-y-4' : 'grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:items-start'}>
      <div className={compact ? 'space-y-4' : 'space-y-6 min-w-0'}>
        <div className="flex items-start gap-4">
          <img
            src={learner.avatar}
            alt=""
            className="h-16 w-16 shrink-0 rounded-full border border-stone-300 object-cover"
          />
          <div className="min-w-0">
            <h2 className="font-serif text-xl font-semibold text-stone-900">{learner.name}</h2>
            <p className="mt-1 text-sm text-stone-600">
              {localizeCohortLabel(learner.enrollmentLabel, locale)}
            </p>
            <p className="text-sm text-stone-600">
              {localizeModuleTitle(learner.currentModule, locale)}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <StatusBadge status={learner.status} />
              <span className={`text-xs ${getRiskColor(learner.dropOffRisk)}`}>
                {t('profile.dropOff', { risk: localizeDropOffRisk(learner.dropOffRisk, t) })}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-stone-300 bg-stone-300">
          <div className="bg-white p-3 text-center">
            <p className="text-[10px] uppercase tracking-wide text-stone-500">{t('profile.avgScore')}</p>
            <p className="mt-1 font-serif text-xl font-semibold text-stone-900">
              {learner.avgScore}
              <span className="text-xs font-normal text-stone-500">/100</span>
            </p>
          </div>
          <div className="bg-white p-3 text-center">
            <p className="text-[10px] uppercase tracking-wide text-stone-500">{t('profile.engagement')}</p>
            <p className="mt-1 font-serif text-xl font-semibold text-stone-900">
              {learner.engagementScore}
            </p>
          </div>
          <div className="bg-white p-3 text-center">
            <p className="text-[10px] uppercase tracking-wide text-stone-500">{t('profile.progress')}</p>
            <p className="mt-1 font-serif text-xl font-semibold text-stone-900">{progressPct}%</p>
          </div>
        </div>

        {compact && chartPanels}

        {!compact && <div className="space-y-4 lg:hidden">{chartPanels}</div>}

        {(pendingSubmissions.length > 0 || openReviewRequests.length > 0) && (
          <section className="rounded-lg border border-amber-200 bg-amber-50/50 p-4">
            <h3 className="text-sm font-medium text-stone-900">{t('profile.pendingWork')}</h3>
            <div className="mt-3 space-y-3">
              {pendingSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="flex items-start justify-between gap-3 border-b border-amber-100 pb-3 last:border-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-stone-900">{submission.assignmentTitle}</p>
                    <p className="mt-0.5 text-[11px] text-stone-600">
                      {localizeModuleTitle(submission.moduleTitle, locale)}
                    </p>
                    <p className="mt-1 text-xs text-stone-700">
                      {submission.aiScore}
                      <span className="text-stone-500">/100</span>
                      <span className="ml-2 text-[10px] uppercase text-amber-700">
                        {t('profile.awaitingReview')}
                      </span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate(`/marking/${submission.id}`)}
                    className="btn-primary shrink-0 text-xs"
                  >
                    {t('profile.reviewSubmission')}
                  </button>
                </div>
              ))}
              {openReviewRequests.map((request) => {
                const linkedSubmission = learnerSubmissions.find((s) => s.id === request.submissionId)
                return (
                  <div
                    key={request.id}
                    className="flex items-start justify-between gap-3 border-b border-amber-100 pb-3 last:border-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-stone-900">{t('profile.reviewRequest')}</p>
                      {linkedSubmission && (
                        <p className="mt-0.5 text-[11px] text-stone-600">
                          {linkedSubmission.assignmentTitle}
                        </p>
                      )}
                      <p className="mt-1 line-clamp-2 text-xs text-stone-700">{request.studentMessage}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate(`/review/${request.id}`)}
                      className="btn-primary shrink-0 text-xs"
                    >
                      {t('profile.review')}
                    </button>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {!compact && (
          <>
            <section className="rounded-lg border border-stone-300 bg-white p-4">
              <h3 className="text-sm font-medium text-stone-900">{t('profile.skillBreakdown')}</h3>
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
            </section>

            {(reviewedSubmissions.length > 0 || learnerSubmissions.length === 0) && (
            <section className="rounded-lg border border-stone-300 bg-white p-4">
              <h3 className="text-sm font-medium text-stone-900">{t('profile.submissions')}</h3>
              <div className="mt-3 space-y-3">
                {reviewedSubmissions.length === 0 ? (
                  <p className="text-xs text-stone-400">{t('profile.noSubmissions')}</p>
                ) : (
                  reviewedSubmissions.map((submission) => (
                    <div
                      key={submission.id}
                      className="flex items-start justify-between gap-3 border-b border-stone-100 pb-3 last:border-0 last:pb-0"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-stone-900">{submission.assignmentTitle}</p>
                        <p className="mt-0.5 text-[11px] text-stone-600">
                          {localizeModuleTitle(submission.moduleTitle, locale)}
                        </p>
                        <p className="mt-1 text-xs text-stone-700">
                          {submission.aiScore}
                          <span className="text-stone-500">/100</span>
                          <span className="ml-2 text-[10px] text-stone-400">
                            {formatTimestamp(submission.submittedAt, dateLocale)}
                          </span>
                        </p>
                        <p className="mt-0.5 text-[10px] uppercase text-stone-500">
                          {submission.mentorMarkedAt ? t('profile.marked') : t('profile.awaitingReview')}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => navigate(`/marking/${submission.id}`)}
                        className="shrink-0 text-xs text-accent hover:underline"
                      >
                        {submission.mentorMarkedAt ? t('profile.review') : t('profile.reviewSubmission')}
                      </button>
                    </div>
                  ))
                )}
              </div>
            </section>
            )}

            <section className="rounded-lg border border-stone-300 bg-white p-4">
              <h3 className="text-sm font-medium text-stone-900">{t('profile.activityLog')}</h3>
              <div className="mt-3 space-y-3">
                {logs.length === 0 ? (
                  <p className="text-xs text-stone-400">{t('profile.noActivity')}</p>
                ) : (
                  logs.map((log) => {
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
                          {getActivityLabel(log.type, t)}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-stone-800">
                            {localizeActivityLogMessage(log.id, log.message, locale)}
                          </p>
                          <p className="mt-0.5 text-[10px] text-stone-400">
                            {formatTimestamp(log.timestamp, dateLocale)}
                          </p>
                          {reviewLink && (
                            <Link
                              to={reviewLink}
                              className="mt-1 inline-block text-xs text-accent hover:underline"
                            >
                              {t('profile.review')}
                            </Link>
                          )}
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </section>
          </>
        )}

        {compact && (
          <section className="rounded-lg border border-stone-300 bg-white p-4">
            <h3 className="text-sm font-medium text-stone-900">{t('profile.activityLog')}</h3>
            <div className="mt-3 space-y-3">
              {logs.length === 0 ? (
                <p className="text-xs text-stone-400">{t('profile.noActivity')}</p>
              ) : (
                logs.slice(0, 4).map((log) => (
                  <div key={log.id} className="flex gap-2 border-b border-stone-100 pb-3 last:border-0">
                    <span className="w-12 shrink-0 text-[10px] font-medium uppercase text-stone-500">
                      {getActivityLabel(log.type, t)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-stone-800">
                        {localizeActivityLogMessage(log.id, log.message, locale)}
                      </p>
                      <p className="mt-0.5 text-[10px] text-stone-400">
                        {formatTimestamp(log.timestamp, dateLocale)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {compact && (
          <Link
            to={`/learners/${learner.id}`}
            className="block text-center text-sm text-accent hover:underline"
          >
            {t('profile.openFull')}
          </Link>
        )}
      </div>

      {!compact && <div className="hidden space-y-4 lg:sticky lg:top-6 lg:block">{chartPanels}</div>}
    </div>
  )
}
