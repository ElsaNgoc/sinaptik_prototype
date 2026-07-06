import { useState, useRef, useCallback, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import BackButton from '../components/BackButton'
import CommentBox, {
  buildMentionables,
  renderCommentText,
  type CommentEntry,
  type MentionableUser,
} from '../components/CommentBox'

export default function RequestedReviewPage() {
  const { requestId } = useParams<{ requestId: string }>()
  const { data, reviewRequests, getSubmissionById, resolveSubmission } = useApp()
  const navigate = useNavigate()
  const contentRef = useRef<HTMLPreElement>(null)

  const request = reviewRequests.find((r) => r.id === requestId)
  const submission = request ? getSubmissionById(request.submissionId) : undefined
  const learner = request ? data.learners.find((l) => l.id === request.learnerId) : undefined

  const mentors = useMemo(() => {
    const map = new Map<string, { id: string; name: string; avatar: string }>()
    map.set(data.currentUser.id, data.currentUser)
    data.learners.forEach((l) => {
      map.set(l.assignedMentor.id, {
        id: l.assignedMentor.id,
        name: l.assignedMentor.name,
        avatar: l.assignedMentor.avatar,
      })
    })
    return Array.from(map.values())
  }, [data.currentUser, data.learners])

  const mentionables = useMemo(
    () => buildMentionables(data.learners, mentors),
    [data.learners, mentors]
  )

  const [mentorReply, setMentorReply] = useState('')
  const [comments, setComments] = useState<CommentEntry[]>([])
  const [selection, setSelection] = useState<{ text: string; top: number } | null>(null)
  const [resolved, setResolved] = useState(false)

  const addComment = (
    text: string,
    mentions: MentionableUser[],
    contextLabel?: string,
    offsetTop = 0
  ) => {
    setComments((prev) => [
      ...prev,
      {
        id: `c-${Date.now()}`,
        text,
        selectedText: contextLabel ?? '',
        offsetTop,
        mentions,
        authorName: data.currentUser.name,
        authorAvatar: data.currentUser.avatar,
        createdAt: new Date().toISOString(),
      },
    ])
    setSelection(null)
    window.getSelection()?.removeAllRanges()
  }

  const handleMouseUp = useCallback(() => {
    const sel = window.getSelection()
    if (!sel || sel.isCollapsed || !contentRef.current) return
    const selectedText = sel.toString().trim()
    if (!selectedText) return
    const range = sel.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    const containerRect = contentRef.current.getBoundingClientRect()
    setSelection({
      text: selectedText,
      top: rect.bottom - containerRect.top + contentRef.current.scrollTop + 8,
    })
  }, [])

  const handleSubmit = () => {
    if (learner) {
      resolveSubmission(learner.id)
      setResolved(true)
      setTimeout(() => navigate('/mentor/tasks'), 1500)
    }
  }

  if (!request || !submission || !learner) {
    return (
      <div>
        <BackButton to="/mentor/tasks" label="Back to tasks" />
        <p className="mt-4 text-stone-500">Review request not found.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <BackButton to={`/mentor/learner/${learner.id}`} label={`Back to ${learner.name}`} />
        <button onClick={handleSubmit} disabled={resolved} className="btn-primary">
          {resolved ? 'Resolved' : 'Submit response'}
        </button>
      </div>

      <h1 className="page-title mt-4">Requested review</h1>
      <p className="page-subtitle">
        {submission.moduleTitle} · {learner.name}
      </p>

      <div className="mt-8 space-y-6">
        <section className="card border-stone-300 p-6">
          <h2 className="section-title">Student submission</h2>
          <div className="relative mt-4">
            <pre
              ref={contentRef}
              onMouseUp={handleMouseUp}
              className="select-text overflow-x-auto border border-stone-300 bg-stone-50 p-4 font-mono text-sm text-stone-800"
            >
              {submission.content}
            </pre>
            {selection && (
              <div className="absolute z-20 w-full max-w-md" style={{ top: selection.top, left: 0 }}>
                <CommentBox
                  mentionables={mentionables}
                  author={data.currentUser}
                  contextLabel={selection.text}
                  compact
                  onSubmit={(text, mentions, ctx) =>
                    addComment(text, mentions, ctx, selection.top)
                  }
                  onCancel={() => setSelection(null)}
                />
              </div>
            )}
          </div>
        </section>

        <section className="card border-stone-300 p-6">
          <h2 className="section-title">AI grading</h2>
          <p className="mt-2 font-serif text-2xl">
            {submission.aiScore}
            <span className="text-base text-stone-500"> / 100</span>
          </p>
          <p className="mt-3 text-sm text-stone-600">{submission.aiFeedback}</p>
        </section>

        <section className="card border-amber-300 bg-amber-50/40 p-6">
          <h2 className="section-title">Student question</h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-800">{request.studentMessage}</p>
        </section>

        <section className="card border-stone-300 p-6">
          <h2 className="section-title">Mentor response</h2>
          <textarea
            value={mentorReply}
            onChange={(e) => setMentorReply(e.target.value)}
            rows={4}
            placeholder="Answer the student's question..."
            className="mt-3 w-full rounded-md border border-stone-300 p-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </section>

        {comments.length > 0 && (
          <section className="card border-stone-300 p-6">
            <h2 className="section-title">Inline comments</h2>
            <ul className="mt-3 space-y-2">
              {comments.map((c) => (
                <li key={c.id} className="border border-stone-200 p-3 text-sm">
                  {renderCommentText(c.text)}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}
