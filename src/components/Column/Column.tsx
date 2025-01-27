import { useState } from 'react'

import { Job, Stage } from '../../types/board'
import { Card } from '../Card/Card'
import { ConfirmationModal } from '../ConfirmationModal/ConfirmationModal'
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

export const Column = ({ title, jobs, onCardClick, onEraseColumn }: Props) => {
  const [showConfirm, setShowConfirm] = useState(false)

  function handleConfirmErase() {
    onEraseColumn(title)

    setShowConfirm(false)
  }

  function handleCancel() {
    setShowConfirm(false)
  }

  return (
    <div>
      {showConfirm && (
        <ConfirmationModal
          stage={title}
          onConfirm={handleConfirmErase}
          onCancel={handleCancel}
        />
      )}

      <div className={ColumnHeaderClassNames}>
        <h2 className={ColumnTitleClassNames}>{title}</h2>

        <button
          onClick={() => setShowConfirm(true)}
          className={ColumnEraseButtonClassNames}
          aria-label='Erase Column'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2}
            stroke='currentColor'
            className='w-5 h-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9 13h6m2 8H7a2 2 0 01-2-2V7h14v12a2 2 0 01-2 2zM9 7V4h6v3'
            />
          </svg>
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
}
