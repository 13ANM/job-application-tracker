import { Draggable } from 'react-beautiful-dnd'
import { Job } from '../../types/board'
import { Card } from '../Card/Card'

interface Props {
	title: string
	jobs: Job[]
}

export const Column = ({ title, jobs }: Props) => {
	return (
		<div>
			<h2 className='text-lg font-bold mb-4'>{title}</h2>
			<div className='space-y-2'>
				{jobs.map((job, index) => (
					<Draggable key={job.id} draggableId={job.id} index={index}>
						{(provided, snapshot) => (
							<div
								ref={provided.innerRef}
								{...provided.draggableProps}
								{...provided.dragHandleProps}
								className={`p-4 bg-white rounded-lg shadow-sm border ${
									snapshot.isDragging ? 'bg-blue-50' : ''
								}`}
							>
								<Card job={job} />
							</div>
						)}
					</Draggable>
				))}
			</div>
		</div>
	)
}
