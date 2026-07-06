import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import { useApp } from './context/AppContext'
import HomePage from './pages/HomePage'
import LearnerLayout from './components/LearnerLayout'
import MentorLayout from './components/MentorLayout'
import LearnerSubmissionPage from './pages/LearnerSubmissionPage'
import LearnerModulesPage from './pages/LearnerModulesPage'
import LearnerProgressPage from './pages/LearnerProgressPage'
import LearnerTestsPage from './pages/LearnerTestsPage'
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
    return <Navigate to={`/mentor/marking/${submission.id}`} replace />
  }
  return <Navigate to="/mentor/tasks" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/learner" element={<LearnerLayout />}>
        <Route index element={<LearnerSubmissionPage />} />
        <Route path="modules" element={<LearnerModulesPage />} />
        <Route path="tests" element={<LearnerTestsPage />} />
        <Route path="progress" element={<LearnerProgressPage />} />
      </Route>

      <Route path="/mentor" element={<MentorLayout />}>
        <Route index element={<MentorDashboardPage />} />
        <Route path="tasks" element={<MentorTasksPage />} />
        <Route path="learners" element={<MentorLearnersPage />} />
        <Route path="notifications" element={<MentorNotificationsPage />} />
        <Route path="programs" element={<MentorProgramsPage />} />
        <Route path="courses" element={<Navigate to="/mentor/programs" replace />} />
        <Route path="learner/:learnerId" element={<LearnerProfilePage />} />
        <Route path="marking/:submissionId" element={<MarkingPage />} />
        <Route path="review/:requestId" element={<RequestedReviewPage />} />
        <Route path="alerts" element={<Navigate to="/mentor/notifications" replace />} />
        <Route path="feedback/:learnerId" element={<LegacyFeedbackRedirect />} />
      </Route>

      <Route path="/mentor/chat" element={<MentorChatPage />} />
      <Route path="/mentor/chat/:learnerId" element={<MentorChatPage />} />
    </Routes>
  )
}
