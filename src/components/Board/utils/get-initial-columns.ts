import { stages } from '../../../sampleData'
import { Job, Stage } from '../../../types/board'

export function getInitialColumns(): Record<Stage, Job[]> {
  return stages.reduce(
    (acc, stage) => {
      acc[stage] = []
      return acc
    },
    {} as Record<Stage, Job[]>
  )
}
