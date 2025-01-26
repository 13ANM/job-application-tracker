import { Job, Stage } from '../../types/board'
import { Card } from '../Card/Card'
import {
  ColumnEraseButtonClassNames,
  ColumnHeaderClassNames,
  ColumnJobsWrapperClassNames,
  ColumnTitleClassNames
} from './styles'

interface Props {
  title: Stage
  jobs: Job[]
  onCardClick: (job: Job) => void
  onEraseColumn: (stage: Stage) => void
}

export const Column = ({ title, jobs, onCardClick, onEraseColumn }: Props) => (
  <div>
    <div className={ColumnHeaderClassNames}>
      <h2 className={ColumnTitleClassNames}>{title}</h2>

      <button
        onClick={() => onEraseColumn(title)}
        className={ColumnEraseButtonClassNames}
      >
        Clear
      </button>
    </div>

    <div className={ColumnJobsWrapperClassNames}>
      {jobs.map((job, index) => (
        <Card
          key={job.id}
          job={job}
          index={index}
          onClick={() => onCardClick(job)}
        />
      ))}
    </div>
  </div>
)
