import { useEffect, useState } from 'react'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd'

import { stages } from '../../constants'
import { Job, Stage } from '../../types/board'
import { Column } from '../Column/Column'
import { Modal } from '../Modal/Modal'
import {
  createJobInSupabase,
  deleteColumnInSupabase,
  deleteJobInSupabase,
  fetchJobsFromSupabase,
  groupJobsByStage,
  updateJobInSupabase
} from './services'
import {
  AddNewCardButtonClassNames,
  BoardColumnContainerClassNames,
  BoardContainerClassNames
} from './styles'
import { getInitialColumns } from './utils/get-initial-columns'
import { moveBetweenLists } from './utils/move-between-lists'
import { reorderSameList } from './utils/reorder-same-list'

export const Board = () => {
  const [columns, setColumns] =
    useState<Record<Stage, Job[]>>(getInitialColumns)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  async function fetchJobs() {
    const { data, error } = await fetchJobsFromSupabase()

    if (error || !data) return

    setColumns(groupJobsByStage(data))
  }

  async function createJob(newJob: Partial<Job>) {
    const { data, error } = await createJobInSupabase(newJob)

    if (!error && data) {
      setColumns(prev => {
        const copy = { ...prev }
        const stageArr = [...(copy[newJob.stage!] ?? [])]
        stageArr.push(data[0])
        copy[newJob.stage!] = stageArr
        return copy
      })
    }
  }

  async function updateJob(updated: Job) {
    const { data, error } = await updateJobInSupabase(updated)
    if (!error && data) {
      setColumns(prev => {
        const copy = { ...prev }

        for (const stage of stages) {
          copy[stage] = copy[stage].filter(j => j.id !== updated.id)
        }

        const updatedStage = data[0].stage as Stage

        copy[updatedStage].push(data[0])

        return copy
      })
    }
  }

  async function deleteJob(job: Job) {
    const { error } = await deleteJobInSupabase(job)

    if (!error) {
      setColumns(prev => {
        const copy = { ...prev }

        for (const stage of stages) {
          copy[stage] = copy[stage].filter(j => j.id !== job.id)
        }

        return copy
      })
    }
  }

  async function handleEraseColumn(stage: Stage) {
    const { error } = await deleteColumnInSupabase(stage)

    if (!error) {
      setColumns(prev => {
        const copy = { ...prev }

        copy[stage] = []

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

    setColumns(prev => {
      const sourceStage = source.droppableId as Stage
      const destinationStage = destination.droppableId as Stage

      if (sourceStage === destinationStage) {
        return {
          ...prev,
          [sourceStage]: reorderSameList(
            prev[sourceStage],
            source.index,
            destination.index
          )
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
          [destinationStage]: destClone
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

    if (editingJob) updateJob({ ...editingJob, ...jobData })

    setIsModalOpen(false)
  }

  function handleModalDelete() {
    if (editingJob) {
      deleteJob(editingJob)
      setIsModalOpen(false)
    }
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
          onDelete={handleModalDelete}
          isNew={isAdding}
        />
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={BoardContainerClassNames}>
          {stages.map(stage => (
            <Droppable key={stage} droppableId={stage}>
              {provided => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={BoardColumnContainerClassNames}
                >
                  <Column
                    title={stage}
                    jobs={columns[stage] || []}
                    onCardClick={handleCardClick}
                    onEraseColumn={handleEraseColumn}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}

          <button
            onClick={handleAddCard}
            className={AddNewCardButtonClassNames}
          >
            +
          </button>
        </div>
      </DragDropContext>
    </>
  )
}
