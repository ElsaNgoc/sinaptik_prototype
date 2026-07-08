import { useLanguage } from '../context/LanguageContext'

export type ReturnNavigationState = {
  returnTo?: string
  returnLabel?: string
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
    tasksReturn: {
      returnTo: '/tasks',
      returnLabel: t('back.tasks'),
    },
    notificationsReturn: {
      returnTo: '/notifications',
      returnLabel: t('back.inbox'),
    },
    backToLearners: t('back.learners'),
    backToDashboard: t('back.dashboard'),
    backToLearner: (name: string) => t('back.learner', { name }),
  }
}
