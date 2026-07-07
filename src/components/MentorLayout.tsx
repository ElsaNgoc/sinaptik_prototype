import { useApp } from '../context/AppContext'
import SidebarShell from './SidebarShell'
import MentorHeader from './MentorHeader'
import {
  getUnreadNotificationCount,
  getPendingTaskCount,
  formatBadgeCount,
} from '../utils/mockDataHelpers'

export default function MentorLayout() {
  const { data, notifications, tasks } = useApp()
  const unreadNotifications = getUnreadNotificationCount(notifications)
  const pendingTasks = getPendingTaskCount(tasks)

  const navItems = [
    { to: '/mentor', label: 'Dashboard', end: true },
    { to: '/mentor/tasks', label: 'Tasks', badge: formatBadgeCount(pendingTasks) },
    { to: '/mentor/learners', label: 'Learners' },
    {
      to: '/mentor/notifications',
      label: 'Inbox',
      badge: formatBadgeCount(unreadNotifications),
    },
    { to: '/mentor/programs', label: 'Course catalog' },
  ]

  return (
    <SidebarShell
      title="Sinaptik"
      subtitle="Mentor portal"
      navItems={navItems}
      header={<MentorHeader />}
      user={{
        name: data.currentUser.name,
        avatar: data.currentUser.avatar,
        role: `Mentor · ${data.cohort.name}`,
      }}
    />
  )
}
