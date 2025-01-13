import { Draggable } from 'react-beautiful-dnd'
import { Job, Status } from '../../types/board'

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
				className={`p-4 bg-white rounded-lg shadow-sm border cursor-pointer space-y-1 ${
					snapshot.isDragging ? 'bg-blue-50' : ''
				}`}
			>
				<h3 className='font-medium text-base'>{job.title}</h3>

				<p className='text-sm text-gray-500'>{job.company}</p>

				<span
					className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
						job.status === Status.Scheduled
							? 'bg-blue-100 text-blue-700'
							: job.status === Status.AwaitingResponse
							? 'bg-yellow-100 text-yellow-700'
							: job.status === Status.Offer
							? 'bg-green-100 text-green-700'
							: 'bg-gray-100 text-gray-700'
					}`}
				>
					{job.status}
				</span>
			</div>
		)}
	</Draggable>
)
