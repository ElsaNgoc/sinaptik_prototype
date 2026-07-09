import type { ActivityLog, DropOffRisk, Learner, LearnerModule, LearnerStatus, Submission } from '../types'
import { bootcampModules, mentors } from './sinaptikCatalog'

const COHORT_LABEL = 'Data Analytics Bootcamp — Batch 7 (2026)'
const BOOTCAMP_ID = 'bootcamp-da'
const PUJA = mentors[0]

/** Fixed anchor so relative times match Figma (July 2026). */
const ANCHOR_MS = new Date('2026-07-06T12:00:00+07:00').getTime()

function daysAgo(days: number): string {
  return new Date(ANCHOR_MS - days * 86400000).toISOString()
}

function buildModuleHistory(
  completedCount: number,
  avgScore: number,
  scores?: (number | null)[]
): LearnerModule[] {
  return bootcampModules.map((mod, i) => {
    if (i < completedCount) {
      const score = scores?.[i] ?? Math.min(100, Math.max(35, avgScore + (i % 2 === 0 ? 8 : -5)))
      return { id: mod.id, title: mod.title, status: 'COMPLETED', score }
    }
    if (i === completedCount && completedCount < bootcampModules.length) {
      return { id: mod.id, title: mod.title, status: 'IN_PROGRESS', score: null }
    }
    return { id: mod.id, title: mod.title, status: 'LOCKED', score: null }
  })
}

function defaultSkills(avgScore: number) {
  return [
    { name: 'Python & Pandas', progress: Math.min(100, avgScore + 12) },
    { name: 'SQL', progress: Math.min(100, avgScore + 4) },
    { name: 'Data Wrangling', progress: Math.min(100, avgScore - 2) },
    { name: 'Data Visualization', progress: Math.min(100, avgScore - 8) },
    { name: 'Machine Learning', progress: Math.min(100, avgScore - 15) },
  ]
}

interface RosterEntry {
  id: string
  name: string
  status: LearnerStatus
  currentModule: string
  moduleProgress: number
  avgScore: number
  engagementScore: number
  dropOffRisk: DropOffRisk
  lastActiveDays: number
  programId?: string
  enrollmentLabel?: string
  moduleHistory?: LearnerModule[]
}

/** 21 learners under Puja Pramudya — names and statuses from Figma. */
const PUJA_ROSTER: RosterEntry[] = [
  {
    id: 'l1',
    name: 'Sari Dewi',
    status: 'PENDING_MENTOR',
    currentModule: 'Module 4: Data Cleaning & Wrangling',
    moduleProgress: 3,
    avgScore: 45,
    engagementScore: 68,
    dropOffRisk: 'High',
    lastActiveDays: 10,
    moduleHistory: buildModuleHistory(3, 45, [78, 61, 55, null]),
  },
  {
    id: 'l2',
    name: 'Andi Santoso',
    status: 'AT_RISK',
    currentModule: 'Module 1: Python for Data',
    moduleProgress: 0,
    avgScore: 72,
    engagementScore: 22,
    dropOffRisk: 'Medium',
    lastActiveDays: 10,
    moduleHistory: buildModuleHistory(0, 72),
  },
  {
    id: 'l3',
    name: 'Udin Halim',
    status: 'AT_RISK',
    currentModule: 'Module 5: Data Visualization',
    moduleProgress: 0,
    avgScore: 62,
    engagementScore: 18,
    dropOffRisk: 'Medium',
    lastActiveDays: 10,
    moduleHistory: buildModuleHistory(0, 62),
  },
  {
    id: 'l4',
    name: 'Dewi Lestari',
    status: 'PENDING_MENTOR',
    currentModule: 'Module 1: Python for Data',
    moduleProgress: 3,
    avgScore: 45,
    engagementScore: 41,
    dropOffRisk: 'High',
    lastActiveDays: 10,
    moduleHistory: buildModuleHistory(3, 45),
  },
  {
    id: 'l5',
    name: 'Yoga Pratama',
    status: 'PENDING_MENTOR',
    currentModule: 'Module 3: Pandas & EDA',
    moduleProgress: 3,
    avgScore: 45,
    engagementScore: 52,
    dropOffRisk: 'High',
    lastActiveDays: 10,
    moduleHistory: buildModuleHistory(3, 45),
  },
  {
    id: 'l6',
    name: 'Sari Lestari',
    status: 'COMPLETED',
    currentModule: 'Program complete',
    moduleProgress: 6,
    avgScore: 72,
    engagementScore: 74,
    dropOffRisk: 'Medium',
    lastActiveDays: 10,
    moduleHistory: buildModuleHistory(6, 72),
  },
  {
    id: 'l7',
    name: 'Rina Wijaya',
    status: 'COMPLETED',
    currentModule: 'Program complete',
    moduleProgress: 6,
    avgScore: 72,
    engagementScore: 70,
    dropOffRisk: 'Medium',
    lastActiveDays: 10,
    moduleHistory: buildModuleHistory(6, 72),
  },
  {
    id: 'l8',
    name: 'Nina Wijaya',
    status: 'AT_RISK',
    currentModule: 'Module 5: Data Visualization',
    moduleProgress: 4,
    avgScore: 19,
    engagementScore: 28,
    dropOffRisk: 'High',
    lastActiveDays: 3,
    moduleHistory: buildModuleHistory(4, 19),
  },
  {
    id: 'l9',
    name: 'Nina Pratama',
    status: 'PENDING_MENTOR',
    currentModule: 'Module 3: Pandas & EDA',
    moduleProgress: 2,
    avgScore: 36,
    engagementScore: 44,
    dropOffRisk: 'High',
    lastActiveDays: 5,
    moduleHistory: buildModuleHistory(2, 36),
  },
  {
    id: 'l10',
    name: 'Andi Dewi',
    status: 'AT_RISK',
    currentModule: 'Module 3: Pandas & EDA',
    moduleProgress: 2,
    avgScore: 23,
    engagementScore: 35,
    dropOffRisk: 'Low',
    lastActiveDays: 2,
    moduleHistory: buildModuleHistory(2, 23),
  },
  {
    id: 'l11',
    name: 'Reza Utami',
    status: 'AT_RISK',
    currentModule: 'Module 3: Pandas & EDA',
    moduleProgress: 2,
    avgScore: 67,
    engagementScore: 31,
    dropOffRisk: 'High',
    lastActiveDays: 18,
    moduleHistory: buildModuleHistory(2, 67),
  },
  {
    id: 'l12',
    name: 'Dimas Wijaya',
    status: 'ON_TRACK',
    currentModule: 'Module 1: Python for Data',
    moduleProgress: 1,
    avgScore: 89,
    engagementScore: 76,
    dropOffRisk: 'Medium',
    lastActiveDays: 6,
    moduleHistory: buildModuleHistory(1, 89),
  },
  {
    id: 'l13',
    name: 'Intan Pratama',
    status: 'COMPLETED',
    currentModule: 'Program complete',
    moduleProgress: 6,
    avgScore: 97,
    engagementScore: 82,
    dropOffRisk: 'Low',
    lastActiveDays: 7,
    moduleHistory: buildModuleHistory(6, 97),
  },
  {
    id: 'l14',
    name: 'Wulan Saputra',
    status: 'AT_RISK',
    currentModule: 'Module 2: SQL & Databases',
    moduleProgress: 1,
    avgScore: 34,
    engagementScore: 29,
    dropOffRisk: 'High',
    lastActiveDays: 10,
    moduleHistory: buildModuleHistory(1, 34),
  },
  {
    id: 'l15',
    name: 'Putri Pratama',
    status: 'COMPLETED',
    currentModule: 'Program complete',
    moduleProgress: 6,
    avgScore: 56,
    engagementScore: 61,
    dropOffRisk: 'Low',
    lastActiveDays: 12,
    moduleHistory: buildModuleHistory(6, 56),
  },
  {
    id: 'l16',
    name: 'Dewi Sari',
    status: 'ON_TRACK',
    currentModule: 'Module 1: Python for Data',
    moduleProgress: 1,
    avgScore: 71,
    engagementScore: 65,
    dropOffRisk: 'Low',
    lastActiveDays: 4,
    moduleHistory: buildModuleHistory(1, 71),
  },
  {
    id: 'l17',
    name: 'Fitri Siregar',
    status: 'ON_TRACK',
    currentModule: 'SQL for Data Analysts',
    moduleProgress: 2,
    avgScore: 74,
    engagementScore: 58,
    dropOffRisk: 'Medium',
    lastActiveDays: 5,
    programId: 'kelas-sql',
    enrollmentLabel: 'SQL for Data Analysts',
    moduleHistory: [
      { id: 's1', title: 'SQL basics & filtering', status: 'COMPLETED', score: 80 },
      { id: 's2', title: 'JOINs & aggregation', status: 'IN_PROGRESS', score: null },
      { id: 's3', title: 'Window functions & CTEs', status: 'LOCKED', score: null },
    ],
  },
  {
    id: 'l18',
    name: 'Rafi Dewi',
    status: 'COMPLETED',
    currentModule: 'Program complete',
    moduleProgress: 6,
    avgScore: 88,
    engagementScore: 55,
    dropOffRisk: 'Low',
    lastActiveDays: 14,
    moduleHistory: buildModuleHistory(6, 88),
  },
  {
    id: 'l19',
    name: 'Sinta Kusuma',
    status: 'ON_TRACK',
    currentModule: 'SQL for Data Analysts',
    moduleProgress: 1,
    avgScore: 63,
    engagementScore: 49,
    dropOffRisk: 'Medium',
    lastActiveDays: 8,
    programId: 'kelas-sql',
    enrollmentLabel: 'SQL for Data Analysts',
    moduleHistory: [
      { id: 's1', title: 'SQL basics & filtering', status: 'IN_PROGRESS', score: null },
      { id: 's2', title: 'JOINs & aggregation', status: 'LOCKED', score: null },
      { id: 's3', title: 'Window functions & CTEs', status: 'LOCKED', score: null },
    ],
  },
  {
    id: 'l20',
    name: 'Melati Gunawan',
    status: 'ON_TRACK',
    currentModule: 'Data Visualization & Storytelling',
    moduleProgress: 2,
    avgScore: 68,
    engagementScore: 62,
    dropOffRisk: 'Low',
    lastActiveDays: 9,
    programId: 'kelas-viz',
    enrollmentLabel: 'Data Visualization & Storytelling',
    moduleHistory: [
      { id: 'v1', title: 'Matplotlib & Seaborn', status: 'COMPLETED', score: 70 },
      { id: 'v2', title: 'Dashboard fundamentals', status: 'IN_PROGRESS', score: null },
      { id: 'v3', title: 'Presenting insights', status: 'LOCKED', score: null },
    ],
  },
  {
    id: 'l21',
    name: 'Agus Permana',
    status: 'ON_TRACK',
    currentModule: 'Module 2: SQL & Databases',
    moduleProgress: 2,
    avgScore: 77,
    engagementScore: 71,
    dropOffRisk: 'Low',
    lastActiveDays: 4,
    moduleHistory: buildModuleHistory(2, 77),
  },
]

function rosterToLearner(entry: RosterEntry): Learner {
  const programId = entry.programId ?? BOOTCAMP_ID
  const totalModules = entry.moduleHistory?.length ?? bootcampModules.length

  return {
    id: entry.id,
    name: entry.name,
    avatar: `https://i.pravatar.cc/150?u=${entry.id}`,
    status: entry.status,
    currentModule: entry.currentModule,
    enrollmentLabel: entry.enrollmentLabel ?? COHORT_LABEL,
    programId,
    assignedMentor: {
      id: PUJA.id,
      name: PUJA.name,
      avatar: PUJA.avatar,
    },
    moduleProgress: entry.moduleProgress,
    totalModules,
    lastActive: daysAgo(entry.lastActiveDays),
    avgScore: entry.avgScore,
    engagementScore: entry.engagementScore,
    dropOffRisk: entry.dropOffRisk,
    skills: defaultSkills(entry.avgScore),
    moduleHistory: entry.moduleHistory ?? buildModuleHistory(entry.moduleProgress, entry.avgScore),
  }
}

const FIRST_NAMES = [
  'Budi', 'Ayu', 'Rizky', 'Putri', 'Hendra', 'Agus', 'Maya', 'Rafi', 'Bayu', 'Rina',
  'Adit', 'Eko', 'Citra', 'Gilang', 'Kartika', 'Melati', 'Fauzan', 'Hadi', 'Lestari', 'Wulan',
]

const LAST_NAMES = [
  'Santoso', 'Nugroho', 'Saputra', 'Hartono', 'Kusuma', 'Permana', 'Siregar', 'Halim',
  'Utami', 'Gunawan', 'Rahayu', 'Wijaya', 'Pratama',
]

const OTHER_STATUSES: LearnerStatus[] = [
  'ON_TRACK', 'ON_TRACK', 'ON_TRACK', 'ON_TRACK', 'ON_TRACK',
  'PENDING_MENTOR', 'PENDING_MENTOR',
  'AT_RISK', 'STUCK',
  'COMPLETED',
]

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

function pick<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)]
}

function generateOtherLearners(count: number, startIndex: number): Learner[] {
  const rand = seededRandom(99)
  const otherMentors = mentors.filter((m) => m.id !== PUJA.id)
  const learners: Learner[] = []

  for (let i = 0; i < count; i++) {
    const id = `l${startIndex + i + 1}`
    const mentor = otherMentors[i % otherMentors.length]
    const moduleProgress = Math.floor(rand() * 7)
    const status = moduleProgress >= 6 ? 'COMPLETED' : pick(OTHER_STATUSES, rand)
    const modIdx = Math.min(moduleProgress, bootcampModules.length - 1)
    const currentModule =
      moduleProgress >= 6
        ? 'Program complete'
        : (bootcampModules[modIdx]?.title ?? bootcampModules[0].title)
    const clampedProgress = Math.min(moduleProgress, 6)
    const avgScore = Math.round(38 + rand() * 50)
    const days = Math.floor(rand() * 14) + 1

    learners.push({
      id,
      name: `${pick(FIRST_NAMES, rand)} ${pick(LAST_NAMES, rand)}`,
      avatar: `https://i.pravatar.cc/150?u=${id}`,
      status,
      currentModule,
      enrollmentLabel: COHORT_LABEL,
      programId: BOOTCAMP_ID,
      assignedMentor: {
        id: mentor.id,
        name: mentor.name,
        avatar: mentor.avatar,
      },
      moduleProgress: clampedProgress,
      totalModules: 6,
      lastActive: daysAgo(days),
      avgScore,
      engagementScore: Math.round(30 + rand() * 60),
      dropOffRisk: pick(['Low', 'Medium', 'High', 'None', 'Critical'], rand),
      skills: defaultSkills(avgScore),
      moduleHistory: buildModuleHistory(clampedProgress, avgScore),
    })
  }

  return learners
}

export const PUJA_LEARNER_COUNT = PUJA_ROSTER.length

export function generateLearners(count = 186): Learner[] {
  const pujaLearners = PUJA_ROSTER.map(rosterToLearner)
  const others = generateOtherLearners(count - pujaLearners.length, pujaLearners.length)
  return [...pujaLearners, ...others]
}

function hoursAgo(days: number, extraHours: number): string {
  return new Date(ANCHOR_MS - days * 86400000 - extraHours * 3600000).toISOString()
}

/**
 * Synthesize an activity timeline for a learner from their status/metrics.
 * Used to fill in learners that don't have curated logs in mock_data.json,
 * so every profile shows a meaningful history.
 */
function buildLearnerActivity(learner: Learner): ActivityLog[] {
  const base = learner.lastActive
  const logs: ActivityLog[] = []
  const days = Math.max(
    1,
    Math.round((ANCHOR_MS - new Date(base).getTime()) / 86400000)
  )
  const mk = (
    suffix: string,
    type: ActivityLog['type'],
    message: string,
    offsetDays: number,
    requiresAction = false
  ): ActivityLog => ({
    id: `log-${learner.id}-${suffix}`,
    learnerId: learner.id,
    type,
    message,
    timestamp: hoursAgo(offsetDays, 0),
    requiresAction,
  })

  switch (learner.status) {
    case 'PENDING_MENTOR':
      logs.push(
        mk(
          'sub',
          'SUBMISSION',
          `${learner.name} submitted work in ${learner.currentModule} — awaiting your review.`,
          days,
          true
        ),
        mk(
          'log',
          'SYSTEM',
          `${learner.name} logged in and opened ${learner.currentModule}.`,
          days + 1
        )
      )
      break
    case 'AT_RISK':
      logs.push(
        mk(
          'alert',
          'AI_ALERT',
          `AI Alert: ${learner.name} drop-off risk ${learner.dropOffRisk} — engagement ${learner.engagementScore}/100.`,
          days
        ),
        mk(
          'sub',
          'SUBMISSION',
          `${learner.name} last submitted in ${learner.currentModule} — scored ${learner.avgScore}/100.`,
          days + 3
        )
      )
      break
    case 'STUCK':
      logs.push(
        mk(
          'alert',
          'AI_ALERT',
          `AI Alert: ${learner.name} inactive for ${days} days on ${learner.currentModule}. Status: Stuck.`,
          days
        ),
        mk(
          'log',
          'SYSTEM',
          `${learner.name} last active ${days} days ago.`,
          days
        )
      )
      break
    case 'COMPLETED':
      logs.push(
        mk(
          'done',
          'SYSTEM',
          `${learner.name} completed the program with final score ${learner.avgScore}/100. Certificate issued.`,
          days
        ),
        mk(
          'sub',
          'SUBMISSION',
          `${learner.name} submitted the final assignment — scored ${learner.avgScore}/100.`,
          days + 2
        )
      )
      break
    default:
      logs.push(
        mk(
          'sub',
          'SUBMISSION',
          `${learner.name} submitted work in ${learner.currentModule} — scored ${learner.avgScore}/100.`,
          days
        ),
        mk(
          'log',
          'SYSTEM',
          `${learner.name} is progressing on schedule in ${learner.currentModule}.`,
          days + 2
        )
      )
  }

  return logs
}

/**
 * Merge curated logs (from mock_data.json) with generated ones so that
 * every learner has at least some activity. Curated logs win — we only
 * synthesize for learners that have none.
 */
/**
 * PENDING_MENTOR learners need a submission record when activity logs say they submitted.
 * Curated submissions from mock_data.json are kept; missing ones are synthesized.
 */
export function ensurePendingSubmissions(
  learners: Learner[],
  submissions: Submission[]
): Submission[] {
  const result = [...submissions]
  const learnersWithSubmissions = new Set(submissions.map((s) => s.learnerId))

  for (const learner of learners) {
    if (learner.status !== 'PENDING_MENTOR') continue
    if (learnersWithSubmissions.has(learner.id)) continue

    result.push({
      id: `sub-synth-${learner.id}`,
      learnerId: learner.id,
      courseId: learner.programId ?? BOOTCAMP_ID,
      moduleTitle: learner.currentModule,
      assignmentTitle: 'Assignment awaiting review',
      content: '# Submission pending mentor review\n\nAwaiting your feedback.',
      aiScore: learner.avgScore,
      aiFeedback: 'Awaiting mentor review.',
      submittedAt: learner.lastActive,
    })
    learnersWithSubmissions.add(learner.id)
  }

  return result
}

export function buildActivityLogs(
  learners: Learner[],
  curatedLogs: ActivityLog[],
  submissions: Submission[] = []
): ActivityLog[] {
  const learnersWithLogs = new Set(curatedLogs.map((l) => l.learnerId))
  const generated = learners
    .filter((l) => !learnersWithLogs.has(l.id))
    .flatMap((learner) => {
      const logs = buildLearnerActivity(learner)
      if (learner.status !== 'PENDING_MENTOR') return logs

      const submission = submissions.find((s) => s.learnerId === learner.id)
      if (!submission) return logs

      return logs.map((log) =>
        log.type === 'SUBMISSION' ? { ...log, submissionId: submission.id } : log
      )
    })
  return [...curatedLogs, ...generated]
}

export function computeStatusBreakdown(learners: Learner[]) {
  return {
    on_track: learners.filter((l) => l.status === 'ON_TRACK' || l.status === 'COMPLETED').length,
    needs_review: learners.filter((l) => l.status === 'PENDING_MENTOR').length,
    stuck: learners.filter((l) => l.status === 'STUCK' || l.status === 'AT_RISK').length,
    completed: learners.filter((l) => l.status === 'COMPLETED').length,
  }
}
