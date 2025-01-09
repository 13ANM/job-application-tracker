import { useState } from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { sampleJobs, stages } from '../../sampleData'
import { Column } from '../Column/Column'
import { Job, Stage } from '../../types/board'

function reorderSameList(list: Job[], startIndex: number, endIndex: number) {
	const result = [...list]
	const [removed] = result.splice(startIndex, 1)

	result.splice(endIndex, 0, removed)

	return result
}

function moveBetweenLists(
	source: Job[],
	destination: Job[],
	sourceIndex: number,
	destinationIndex: number
) {
	const sourceClone = [...source]
	const destClone = [...destination]
	const [removed] = sourceClone.splice(sourceIndex, 1)
	destClone.splice(destinationIndex, 0, removed)

	return { sourceClone, destClone, movedItem: removed }
}

export const Board = () => {
	const [columns, setColumns] = useState<Record<Stage, Job[]>>(() =>
		stages.reduce((acc, stage) => {
			acc[stage] = sampleJobs.filter((job) => job.stage === stage)

			return acc
		}, {} as Record<Stage, Job[]>)
	)

	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result

		if (!destination) return

		if (
			source.droppableId === destination.droppableId &&
			source.index === destination.index
		)
			return

		setColumns((prev) => {
			const sourceStage = source.droppableId as Stage
			const destinationStage = destination.droppableId as Stage

			if (sourceStage === destinationStage) {
				return {
					...prev,
					[sourceStage]: reorderSameList(
						prev[sourceStage],
						source.index,
						destination.index
					),
				}
			} else {
				const { sourceClone, destClone, movedItem } = moveBetweenLists(
					prev[sourceStage],
					prev[destinationStage],
					source.index,
					destination.index
				)
				movedItem.stage = destinationStage
				return {
					...prev,
					[sourceStage]: sourceClone,
					[destinationStage]: destClone,
				}
			}
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
