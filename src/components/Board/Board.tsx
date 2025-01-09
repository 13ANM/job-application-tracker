import { useState } from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { sampleJobs, stages } from '../../sampleData'
import { Job, Stage } from '../../types/board'
import { Column } from '../Column/Column'

export const Board = () => {
	const [columns, setColumns] = useState<Record<Stage, Job[]>>(() =>
		stages.reduce((acc, stage) => {
			acc[stage] = sampleJobs.filter((job) => job.stage === stage)
			return acc
		}, {} as Record<Stage, Job[]>)
	)

	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result

		if (
			!destination ||
			(source.droppableId === destination.droppableId &&
				source.index === destination.index)
		) {
			return
		}

		const sourceStage = source.droppableId as Stage
		const destinationStage = destination.droppableId as Stage

		const sourceJobs = Array.from(columns[sourceStage])
		const [movedJob] = sourceJobs.splice(source.index, 1)

		movedJob.stage = destinationStage

		const destinationJobs = Array.from(columns[destinationStage])
		destinationJobs.splice(destination.index, 0, movedJob)

		setColumns({
			...columns,
			[sourceStage]: sourceJobs,
			[destinationStage]: destinationJobs,
		})
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className='flex space-x-4 p-4 bg-gray-50 min-h-screen'>
				{stages.map((stage) => (
					<Droppable key={stage} droppableId={stage}>
						{(provided) => (
							<div
								ref={provided.innerRef}
								{...provided.droppableProps}
								className='flex-1 bg-gray-100 p-4 rounded-lg shadow'
							>
								<Column title={stage} jobs={columns[stage]} />
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				))}
			</div>
		</DragDropContext>
	)
}
