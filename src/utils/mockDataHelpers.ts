import type {
  ChatConversation,
  Learner,
  MentorTask,
  Notification,
  NotificationType,
  Submission,
} from '../types'

/** Use cohort KPIs from mock (Figma: 52.4%, 45/100) — not derived from partial submissions. */
export function getMentorDashboardKpis(cohort: { completionRate: number; avgScore: number }) {
  return {
    completionRate: cohort.completionRate,
    averageScore: cohort.avgScore,
  }
}

export function getSubmissionById(
  submissions: Submission[],
  submissionId: string
): Submission | undefined {
  return submissions.find((s) => s.id === submissionId)
}

export function getSubmissionForLearner(
  submissions: Submission[],
  learnerId: string,
  submissionId?: string
): Submission | undefined {
  if (submissionId) return getSubmissionById(submissions, submissionId)
  return submissions.find((s) => s.learnerId === learnerId)
}

export function getTasksForDate(tasks: MentorTask[], isoDate: string): MentorTask[] {
  return tasks.filter((t) => t.dueDate === isoDate)
}

export function getCalendarTaskMarkers(tasks: MentorTask[]) {
  const dates = new Set(tasks.map((t) => t.dueDate))
  return Array.from(dates).sort()
}

export type CalendarDayStatus = 'complete' | 'due' | 'upcoming'

/**
 * Per-day calendar dot:
 * - complete: all tasks done
 * - due: has pending task on/before today (needs attention now)
 * - upcoming: has pending task in the future (not yet actionable)
 */
export function getCalendarDayStatus(tasks: MentorTask[], todayIso: string) {
  const byDate = new Map<string, { pending: number; total: number }>()
  for (const task of tasks) {
    const entry = byDate.get(task.dueDate) ?? { pending: 0, total: 0 }
    entry.total++
    if (task.status === 'PENDING') entry.pending++
    byDate.set(task.dueDate, entry)
  }
  const result = new Map<string, CalendarDayStatus>()
  byDate.forEach((v, date) => {
    if (v.pending === 0) {
      result.set(date, 'complete')
    } else if (date > todayIso) {
      result.set(date, 'upcoming')
    } else {
      result.set(date, 'due')
    }
  })
  return result
}

export function groupTasksByCourse(tasks: MentorTask[]) {
  const map = new Map<string, { courseName: string; tasks: MentorTask[] }>()
  for (const task of tasks) {
    const existing = map.get(task.courseId)
    if (existing) {
      existing.tasks.push(task)
    } else {
      map.set(task.courseId, { courseName: task.courseName, tasks: [task] })
    }
  }
  return map
}

export function groupTasksByCourseModule(tasks: MentorTask[]) {
  const courses = groupTasksByCourse(tasks)
  const result: {
    courseId: string
    courseName: string
    modules: { moduleTitle: string; tasks: MentorTask[] }[]
  }[] = []

  courses.forEach((course, courseId) => {
    const moduleMap = new Map<string, MentorTask[]>()
    for (const task of course.tasks) {
      const list = moduleMap.get(task.moduleTitle) ?? []
      list.push(task)
      moduleMap.set(task.moduleTitle, list)
    }
    result.push({
      courseId,
      courseName: course.courseName,
      modules: Array.from(moduleMap.entries()).map(([moduleTitle, moduleTasks]) => ({
        moduleTitle,
        tasks: moduleTasks,
      })),
    })
  })

  return result
}

export function getPendingTaskCount(tasks: MentorTask[]): number {
  return tasks.filter((t) => t.status === 'PENDING').length
}

export function getUnreadNotificationCount(notifications: Notification[]): number {
  return notifications.filter((n) => !n.read).length
}

export const BADGE_COUNT_CAP = 5

/** Show 1–5 or "5+" for nav/icon badges. */
export function formatBadgeCount(count: number, cap = BADGE_COUNT_CAP): string | undefined {
  if (count <= 0) return undefined
  if (count > cap) return `${cap}+`
  return String(count)
}

export function getUnreadChatCount(conversations: ChatConversation[]): number {
  return conversations.reduce((sum, c) => sum + c.unreadCount, 0)
}

export function sortNotificationsByDate(notifications: Notification[]): Notification[] {
  return [...notifications].sort((a, b) => b.date.localeCompare(a.date))
}

export type NotificationDateWithin =
  | 'any'
  | '1d'
  | '3d'
  | '1w'
  | '2w'
  | '1m'
  | '1y'

const DATE_WITHIN_DAYS: Record<Exclude<NotificationDateWithin, 'any'>, number> = {
  '1d': 1,
  '3d': 3,
  '1w': 7,
  '2w': 14,
  '1m': 30,
  '1y': 365,
}

function parseIsoDate(iso: string): Date {
  return new Date(iso + 'T12:00:00')
}

/** Gmail-style: notifications on or before anchor, within N days lookback. */
export function filterNotificationsByDateWithin(
  notifications: Notification[],
  within: NotificationDateWithin,
  anchorDate: string
): Notification[] {
  if (within === 'any' || !anchorDate) return notifications

  const anchor = parseIsoDate(anchorDate)
  const days = DATE_WITHIN_DAYS[within]
  const start = new Date(anchor)
  start.setDate(start.getDate() - days)

  return notifications.filter((n) => {
    const d = parseIsoDate(n.date)
    return d >= start && d <= anchor
  })
}

export function getRecentNotifications(notifications: Notification[], limit = 5): Notification[] {
  return sortNotificationsByDate(notifications).slice(0, limit)
}

export function filterNotificationsByTab(
  notifications: Notification[],
  tab: 'ALL' | 'GRADING' | 'AI_ALERT' | 'SYSTEM' | 'MENTOR_REQUEST' | 'ASSIGNMENT_SUBMISSION'
): Notification[] {
  if (tab === 'ALL') return notifications
  if (tab === 'GRADING' || tab === 'MENTOR_REQUEST' || tab === 'ASSIGNMENT_SUBMISSION') {
    return notifications.filter((n) => n.type === 'SUBMISSION' || n.type === 'MENTOR_REQUEST')
  }
  if (tab === 'AI_ALERT') {
    return notifications.filter((n) => n.type === 'AI_ALERT')
  }
  if (tab === 'SYSTEM') {
    return notifications.filter((n) => n.type === 'SYSTEM')
  }
  return notifications
}

export function searchLearners(learners: Learner[], query: string): Learner[] {
  const q = query.trim().toLowerCase()
  if (!q) return learners
  return learners.filter(
    (l) =>
      l.name.toLowerCase().includes(q) ||
      l.currentModule.toLowerCase().includes(q) ||
      l.enrollmentLabel.toLowerCase().includes(q)
  )
}

export function buildChatLearnerList(
  conversations: ChatConversation[],
  learners: Learner[]
): {
  learnerId: string
  name: string
  courseLabel: string
  lastMessage: string
  unreadCount: number
}[] {
  const fromConversations = conversations.map((c) => ({
    learnerId: c.learnerId,
    name: c.learnerName,
    courseLabel: c.courseLabel,
    lastMessage: c.lastMessage,
    unreadCount: c.unreadCount,
  }))

  const known = new Set(fromConversations.map((c) => c.learnerId))
  const extras = learners
    .filter((l) => !known.has(l.id))
    .map((l) => ({
      learnerId: l.id,
      name: l.name,
      courseLabel: l.enrollmentLabel,
      lastMessage: '',
      unreadCount: 0,
    }))

  return [...fromConversations, ...extras].sort((a, b) => {
    if (b.unreadCount !== a.unreadCount) return b.unreadCount - a.unreadCount
    return a.name.localeCompare(b.name)
  })
}

export function getNotificationRoute(
  notification: Notification,
  type: NotificationType
): string {
  if (notification.reviewRequestId) {
    return `/review/${notification.reviewRequestId}`
  }
  if (notification.submissionId) {
    return `/marking/${notification.submissionId}`
  }
  if (type === 'CHAT') {
    return `/chat/${notification.learnerId}`
  }
  if (type === 'AI_ALERT') {
    return `/learners/${notification.learnerId}`
  }
  if (type === 'MENTOR_REQUEST') {
    return `/learners/${notification.learnerId}`
  }
  if (type === 'SUBMISSION' && notification.submissionId) {
    return `/marking/${notification.submissionId}`
  }
  return `/learners/${notification.learnerId}`
}

export function getTaskRoute(task: MentorTask): string {
  if (task.type === 'REVIEW_REQUEST' && task.reviewRequestId) {
    return `/review/${task.reviewRequestId}`
  }
  if (task.submissionId) {
    return `/marking/${task.submissionId}`
  }
  return `/learners/${task.learnerId}`
}
