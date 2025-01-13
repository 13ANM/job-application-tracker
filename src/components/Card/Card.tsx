import { Draggable } from 'react-beautiful-dnd'

import { Job } from '../../types/board'
import { getCardClassName, getStatusPillClassName } from './styles'

interface Props {
  job: Job
  index: number
  onClick: () => void
}

export const Card = ({ job, index, onClick }: Props) => (
  <Draggable draggableId={job.id} index={index}>
    {(provided, snapshot) => (
      <div
        onClick={onClick}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={getCardClassName(snapshot.isDragging)}
      >
        <h3 className='font-medium text-base'>{job.title}</h3>

        <p className='text-sm text-gray-500'>{job.company}</p>

        <span className={getStatusPillClassName(job.status)}>{job.status}</span>
      </div>
    )}
  </Draggable>
)
