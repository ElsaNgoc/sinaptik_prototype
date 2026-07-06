import { useApp } from '../context/AppContext'
import SidebarShell from './SidebarShell'
import MentorHeader from './MentorHeader'
import { getUnreadNotificationCount, getPendingTaskCount } from '../utils/mockDataHelpers'

export default function MentorLayout() {
  const { data, notifications, tasks } = useApp()
  const { navBadges } = data
  const unreadNotifications = getUnreadNotificationCount(notifications)
  const pendingTasks = getPendingTaskCount(tasks)

  const navItems = [
    { to: '/mentor', label: 'Dashboard', end: true, badge: navBadges.dashboard },
    { to: '/mentor/tasks', label: 'Tasks', badge: pendingTasks || undefined },
    { to: '/mentor/learners', label: 'Learners' },
    { to: '/mentor/notifications', label: 'Notifications', badge: unreadNotifications || undefined },
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
