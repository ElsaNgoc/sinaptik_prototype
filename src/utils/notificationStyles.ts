import type { NotificationType } from '../types'

export const NOTIFICATION_TYPE_LABELS: Record<NotificationType, string> = {
  SUBMISSION: 'Submission',
  MENTOR_REQUEST: 'Feedback request',
  AI_ALERT: 'AI alert',
  SYSTEM: 'System',
  CHAT: 'Chat',
}

type NotificationStyle = {
  label: string
  rowBg: string
  rowBgHover: string
  border: string
  badge: string
  dot: string
}

const STYLES: Record<NotificationType, NotificationStyle> = {
  SUBMISSION: {
    label: NOTIFICATION_TYPE_LABELS.SUBMISSION,
    rowBg: 'bg-amber-50',
    rowBgHover: 'hover:bg-amber-50',
    border: 'border-l-amber-500',
    badge: 'bg-amber-100 text-amber-900',
    dot: 'bg-amber-500',
  },
  MENTOR_REQUEST: {
    label: NOTIFICATION_TYPE_LABELS.MENTOR_REQUEST,
    rowBg: 'bg-amber-50',
    rowBgHover: 'hover:bg-amber-50',
    border: 'border-l-amber-500',
    badge: 'bg-amber-100 text-amber-900',
    dot: 'bg-amber-500',
  },
  AI_ALERT: {
    label: NOTIFICATION_TYPE_LABELS.AI_ALERT,
    rowBg: 'bg-rose-50',
    rowBgHover: 'hover:bg-rose-50',
    border: 'border-l-rose-500',
    badge: 'bg-rose-100 text-rose-800',
    dot: 'bg-rose-500',
  },
  SYSTEM: {
    label: NOTIFICATION_TYPE_LABELS.SYSTEM,
    rowBg: 'bg-emerald-50',
    rowBgHover: 'hover:bg-emerald-50',
    border: 'border-l-emerald-500',
    badge: 'bg-emerald-100 text-emerald-800',
    dot: 'bg-emerald-500',
  },
  CHAT: {
    label: NOTIFICATION_TYPE_LABELS.CHAT,
    rowBg: 'bg-violet-50',
    rowBgHover: 'hover:bg-violet-50',
    border: 'border-l-violet-500',
    badge: 'bg-violet-100 text-violet-800',
    dot: 'bg-violet-500',
  },
}

export function getNotificationTypeStyle(type: NotificationType) {
  return STYLES[type]
}

export const NOTIFICATION_LEGEND_TYPES: NotificationType[] = [
  'SUBMISSION',
  'MENTOR_REQUEST',
  'AI_ALERT',
  'SYSTEM',
]

export const READ_NOTIFICATION_ROW = {
  rowBg: 'bg-stone-50',
  rowBgHover: 'hover:bg-stone-50',
  border: 'border-l-stone-300',
  badge: 'bg-stone-100 text-stone-500',
} as const
