import { Job } from '../../types/board'
import { Card } from '../Card/Card'
import { ColumnJobsWrapperClassNames, ColumnTitleClassNames } from './styles'

interface Props {
  title: string
  jobs: Job[]
  onCardClick: (job: Job) => void
}

export const Column = ({ title, jobs, onCardClick }: Props) => (
  <div>
    <h2 className={ColumnTitleClassNames}>{title}</h2>

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
