import { Draggable } from 'react-beautiful-dnd'
import { Job } from '../../types/board'

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
				className={`p-4 bg-white rounded-lg shadow-sm border cursor-pointer ${
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
