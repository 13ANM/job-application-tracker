import { Job } from '../../types/board'
import { Draggable } from 'react-beautiful-dnd'

interface Props {
	job: Job
	index: number
}

export const Card = ({ job, index }: Props) => (
	<Draggable draggableId={job.id} index={index}>
		{(provided, snapshot) => (
			<div
				ref={provided.innerRef}
				{...provided.draggableProps}
				{...provided.dragHandleProps}
				className={`p-4 bg-white rounded-lg shadow-sm border ${
					snapshot.isDragging ? 'bg-blue-50' : ''
				}`}
			>
				<h3 className='font-medium'>{job.title}</h3>
				<p className='text-sm text-gray-500'>{job.company}</p>
				<p className='text-sm text-blue-500'>{job.status}</p>
			</div>
		)}
	</Draggable>
)
