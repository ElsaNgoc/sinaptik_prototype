import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom'
import { useApp } from './context/AppContext'
import MentorLayout from './components/MentorLayout'
import MentorDashboardPage from './pages/MentorDashboardPage'
import MentorTasksPage from './pages/MentorTasksPage'
import MentorLearnersPage from './pages/MentorLearnersPage'
import MentorProgramsPage from './pages/MentorProgramsPage'
import MentorNotificationsPage from './pages/MentorNotificationsPage'
import MentorChatPage from './pages/MentorChatPage'
import LearnerProfilePage from './pages/LearnerProfilePage'
import MarkingPage from './pages/MarkingPage'
import RequestedReviewPage from './pages/RequestedReviewPage'

function LegacyFeedbackRedirect() {
  const { learnerId } = useParams<{ learnerId: string }>()
  const { getSubmission } = useApp()
  const submission = learnerId ? getSubmission(learnerId) : undefined
  if (submission) {
    return <Navigate to={`/marking/${submission.id}`} replace />
  }
  return <Navigate to="/tasks" replace />
}

function LegacyMentorRedirect() {
  const { pathname } = useLocation()
  const next = pathname.replace(/^\/mentor/, '') || '/'
  return <Navigate to={next} replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MentorLayout />}>
        <Route index element={<MentorDashboardPage />} />
        <Route path="tasks" element={<MentorTasksPage />} />
        <Route path="learners" element={<MentorLearnersPage />} />
        <Route path="learners/:learnerId" element={<LearnerProfilePage />} />
        <Route path="notifications" element={<MentorNotificationsPage />} />
        <Route path="programs" element={<MentorProgramsPage />} />
        <Route path="courses" element={<Navigate to="/programs" replace />} />
        <Route path="marking/:submissionId" element={<MarkingPage />} />
        <Route path="review/:requestId" element={<RequestedReviewPage />} />
        <Route path="alerts" element={<Navigate to="/notifications" replace />} />
        <Route path="feedback/:learnerId" element={<LegacyFeedbackRedirect />} />
      </Route>

      <Route path="/chat" element={<MentorChatPage />} />
      <Route path="/chat/:learnerId" element={<MentorChatPage />} />

      <Route path="/mentor/*" element={<LegacyMentorRedirect />} />
      <Route path="/learner/*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
