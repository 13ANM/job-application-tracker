import { useEffect, useState } from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { supabase } from '../../supabase'
import { stages } from '../../sampleData'
import { Column } from '../Column/Column'
import { Job, Stage } from '../../types/board'
import { Modal } from '../Modal/Modal'

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
	const [columns, setColumns] = useState<Record<Stage, Job[]>>({})
	const [editingJob, setEditingJob] = useState<Job | null>(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isAdding, setIsAdding] = useState(false)

	async function fetchJobs() {
		const { data, error } = await supabase.from('jobs').select('*')

		if (error || !data) return

		const grouped = stages.reduce((acc, stage) => {
			acc[stage] = data.filter((job: Job) => job.stage === stage)

			return acc
		}, {} as Record<Stage, Job[]>)

		setColumns(grouped)
	}

	async function createJob(newJob: Partial<Job>) {
		const { data, error } = await supabase.from('jobs').insert(newJob).select()

		if (!error && data) {
			setColumns((prev) => {
				const copy = { ...prev }
				const stageArr = [...(copy[newJob.stage!] ?? [])]
				stageArr.push(data[0])
				copy[newJob.stage!] = stageArr
				return copy
			})
		}
	}

	async function updateJob(updated: Job) {
		const { data, error } = await supabase
			.from('jobs')
			.update({
				title: updated.title,
				company: updated.company,
				status: updated.status,
				stage: updated.stage,
			})
			.eq('id', updated.id)
			.select()

		if (!error && data) {
			setColumns((prev) => {
				const copy = { ...prev }

				for (const stage of stages) {
					copy[stage] = copy[stage].filter((j) => j.id !== updated.id)
				}

				const updatedStage = data[0].stage

				copy[updatedStage].push(data[0])

				return copy
			})
		}
	}

	function onDragEnd(result: DropResult) {
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

				updateJob(movedItem)

				return {
					...prev,
					[sourceStage]: sourceClone,
					[destinationStage]: destClone,
				}
			}
		})
	}

	function handleAddCard() {
		setEditingJob(null)
		setIsModalOpen(true)
		setIsAdding(true)
	}

	function handleCardClick(job: Job) {
		setEditingJob(job)
		setIsAdding(false)
		setIsModalOpen(true)
	}

	function handleModalSave(jobData: Partial<Job>) {
		if (isAdding) createJob(jobData)
		else if (editingJob) updateJob({ ...editingJob, ...jobData })
		setIsModalOpen(false)
	}

	useEffect(() => {
		fetchJobs()
	}, [])

	return (
		<>
			{isModalOpen && (
				<Modal
					initialJob={editingJob || {}}
					onClose={() => setIsModalOpen(false)}
					onSave={handleModalSave}
				/>
			)}
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
									<Column
										title={stage}
										jobs={columns[stage] || []}
										onCardClick={handleCardClick}
									/>
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					))}
					<button
						onClick={handleAddCard}
						className='h-10 px-4 py-2 bg-green-500 text-white rounded'
					>
						Add New Card
					</button>
				</div>
			</DragDropContext>
		</>
	)
}
