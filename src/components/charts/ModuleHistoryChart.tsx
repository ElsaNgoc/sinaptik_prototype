import type { Learner } from '../../types'

interface ModuleHistoryChartProps {
  learner: Learner
}

export default function ModuleHistoryChart({ learner }: ModuleHistoryChartProps) {
  const visited = learner.moduleHistory.filter((m) => m.status !== 'LOCKED')

  return (
    <section className="rounded-lg border border-stone-300 bg-white p-4">
      <h3 className="text-sm font-medium text-stone-900">Modules visited</h3>
      <p className="mt-1 text-xs text-stone-500">
        {visited.length} of {learner.moduleHistory.length} modules started
      </p>

      {visited.length === 0 ? (
        <p className="mt-3 text-xs text-stone-400">No modules visited yet.</p>
      ) : (
        <div className="mt-3 space-y-2.5">
          {visited.map((mod) => {
            const inProgress = mod.status === 'IN_PROGRESS'
            const pct = inProgress ? 100 : (mod.score ?? 0)

            return (
              <div
                key={mod.id}
                className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,2fr)_2.5rem] items-center gap-2 sm:gap-3"
                title={mod.title}
              >
                <p className="truncate text-xs text-stone-600">{mod.title}</p>
                <div className="h-2 overflow-hidden rounded-sm bg-stone-200">
                  <div
                    className={`h-full rounded-sm ${inProgress ? 'bg-stone-400/50' : 'bg-accent'}`}
                    style={{ width: inProgress ? '100%' : `${pct}%` }}
                  />
                </div>
                <span
                  className={`text-right text-xs tabular-nums ${
                    inProgress ? 'text-stone-500' : 'text-stone-800'
                  }`}
                >
                  {inProgress ? '…' : mod.score}
                </span>
              </div>
            )
          })}
        </div>
      )}

      <div className="mt-3 flex flex-wrap gap-4 text-[11px] text-stone-600">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-sm bg-accent" />
          Completed (score)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-sm bg-stone-400/50" />
          In progress
        </span>
      </div>
    </section>
  )
}
