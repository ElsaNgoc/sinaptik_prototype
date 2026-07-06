import { useApp } from '../context/AppContext'
import { groupLearnersByColumn, getMentorLearners } from '../utils/dashboard'
import { getMentorDashboardKpis } from '../utils/mockDataHelpers'
import StatCard from '../components/StatCard'
import LearnerCard from '../components/LearnerCard'
import {
  GroupedBarChart,
  VerticalBarChart,
  HorizontalBarChart,
} from '../components/charts/BarChart'

const columnConfig = [
  { key: 'stuck' as const, title: 'Stuck / at risk' },
  { key: 'needs_review' as const, title: 'Needs review' },
  { key: 'on_track' as const, title: 'On track' },
]

export default function MentorDashboardPage() {
  const { data } = useApp()
  const { cohort, learners, dashboardAnalytics, currentUser } = data
  const kpis = getMentorDashboardKpis(cohort)

  const myLearners = getMentorLearners(learners, currentUser.id)
  const grouped = groupLearnersByColumn(myLearners)

  return (
    <div>
      <h1 className="page-title">Command center</h1>
      <p className="page-subtitle">{cohort.name}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <StatCard label="Completion rate" value={kpis.completionRate} suffix="%" />
        <StatCard label="Average score" value={kpis.averageScore} suffix="/100" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <GroupedBarChart
          title="Weekly engagement"
          subtitle="Logins and submissions by day"
          data={dashboardAnalytics.weeklyEngagement.map((d) => ({
            label: d.day,
            logins: d.logins,
            submissions: d.submissions,
          }))}
        />
        <HorizontalBarChart
          title="Module completion"
          subtitle="Learners who completed each module"
          data={dashboardAnalytics.moduleCompletion.map((d) => ({
            label: d.module.replace(/^M\d+: /, 'M'),
            value: d.completed,
            display: `${d.completed}/${d.total}`,
          }))}
          maxValue={cohort.totalLearners}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <VerticalBarChart
          title="Score distribution"
          subtitle="Number of AI-graded submissions per range"
          data={dashboardAnalytics.scoreDistribution.map((d) => ({
            label: d.range,
            value: d.count,
            sublabel: d.label,
          }))}
        />
        <HorizontalBarChart
          title="Cohort skill averages"
          subtitle="Average proficiency by skill area"
          data={dashboardAnalytics.skillAverages.map((d) => ({
            label: d.skill,
            value: d.avg,
            display: `${d.avg}%`,
          }))}
          maxValue={100}
        />
      </div>

      <section className="mt-10">
        <div className="section-heading">
          <h3 className="section-title">Learner progress board</h3>
        </div>
        <p className="mt-3 text-sm text-stone-600">
          {myLearners.length} learners under {currentUser.name} · {cohort.totalLearners} total in
          cohort
        </p>
        <div className="mt-4 grid gap-6 md:grid-cols-3">
          {columnConfig.map((col) => (
            <div key={col.key} className="rounded-lg border border-stone-300 bg-white p-4">
              <div className="mb-4 flex items-center justify-between border-b border-stone-200 pb-2">
                <h4 className="text-sm font-medium text-stone-900">{col.title}</h4>
                <span className="text-xs text-stone-500">{grouped[col.key].length}</span>
              </div>
              <div className="max-h-80 space-y-3 overflow-y-auto">
                {grouped[col.key].length === 0 ? (
                  <p className="py-6 text-center text-sm text-stone-400">No learners</p>
                ) : (
                  grouped[col.key].slice(0, 8).map((learner) => (
                    <LearnerCard key={learner.id} learner={learner} />
                  ))
                )}
                {grouped[col.key].length > 8 && (
                  <p className="text-center text-xs text-stone-500">
                    +{grouped[col.key].length - 8} more learners
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
