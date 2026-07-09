import { useLanguage } from '../context/LanguageContext'

export type ReturnNavigationState = {
  returnTo?: string
  returnLabel?: string
}

export function tasksPathWithDate(date?: string): string {
  return date ? `/tasks?date=${date}` : '/tasks'
}

export function buildTasksReturn(
  label: string,
  date?: string
): ReturnNavigationState {
  return {
    returnTo: tasksPathWithDate(date),
    returnLabel: label,
  }
}

export function resolveBackNavigation(
  state: unknown,
  defaultTo: string,
  defaultLabel: string
) {
  const nav = state as ReturnNavigationState | null
  return {
    to: nav?.returnTo ?? defaultTo,
    label: nav?.returnLabel ?? defaultLabel,
  }
}

export function useReturnNavigation() {
  const { t } = useLanguage()
  return {
    tasksReturn: buildTasksReturn(t('back.tasks')),
    tasksReturnForDate: (date: string) => buildTasksReturn(t('back.tasks'), date),
    notificationsReturn: {
      returnTo: '/notifications',
      returnLabel: t('back.inbox'),
    },
    backToLearners: t('back.learners'),
    backToDashboard: t('back.dashboard'),
    backToLearner: (name: string) => t('back.learner', { name }),
  }
}
