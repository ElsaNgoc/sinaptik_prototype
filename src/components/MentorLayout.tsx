import { useApp } from '../context/AppContext'
import SidebarShell from './SidebarShell'
import MentorHeader from './MentorHeader'

export default function MentorLayout() {
  const { data } = useApp()
  const { navBadges } = data

  const navItems = [
    { to: '/mentor', label: 'Dashboard', end: true, badge: navBadges.dashboard },
    { to: '/mentor/tasks', label: 'Tasks', badge: navBadges.tasks },
    { to: '/mentor/learners', label: 'Learners' },
    { to: '/mentor/notifications', label: 'Notifications', badge: navBadges.notifications },
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
