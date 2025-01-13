import { useState } from 'react'

import { Job, Stage, Status } from '../../types/board'
import {
  ModalButtonContainerClassNames,
  ModalCancelButtonClassNames,
  ModalContainerClassNames,
  ModalDeleteButtonClassNames,
  ModalInnerClassNames,
  ModalInputClassNames,
  ModalSaveButtonClassNames,
  ModalSelectClassNames,
  ModalTitleClassNames
} from './styles'

interface Props {
  initialJob: Partial<Job>
  onClose: () => void
  onSave: (updated: Partial<Job>) => void
  onDelete: () => void
  isNew: boolean
}

export const Modal = ({
  initialJob,
  onClose,
  onSave,
  onDelete,
  isNew
}: Props) => {
  const [title, setTitle] = useState(initialJob.title || '')
  const [company, setCompany] = useState(initialJob.company || '')
  const [status, setStatus] = useState<Status>(
    initialJob.status || Status.Scheduled
  )
  const [stage, setStage] = useState<Stage>(initialJob.stage || Stage.Applied)

  function handleSubmit() {
    onSave({ title, company, status, stage })
  }

  function handleDelete() {
    onDelete()
  }

  return (
    <div className={ModalContainerClassNames}>
      <div className={ModalInnerClassNames}>
        <h2 className={ModalTitleClassNames}>
          {initialJob.id ? 'Edit Job' : 'Add Job'}
        </h2>

        <input
          className={ModalInputClassNames}
          placeholder='Title'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          className={ModalInputClassNames}
          placeholder='Company'
          value={company}
          onChange={e => setCompany(e.target.value)}
        />
        <select
          className={ModalSelectClassNames}
          value={status}
          onChange={e => setStatus(e.target.value as Status)}
        >
          <option value={Status.Scheduled}>{Status.Scheduled}</option>
          <option value={Status.AwaitingResponse}>
            {Status.AwaitingResponse}
          </option>
          <option value={Status.Offer}>{Status.Offer}</option>
        </select>
        <select
          className={ModalSelectClassNames}
          value={stage}
          onChange={e => setStage(e.target.value as Stage)}
        >
          <option value={Stage.Applied}>{Stage.Applied}</option>
          <option value={Stage.HR}>{Stage.HR}</option>
          <option value={Stage.HomeAssignment}>{Stage.HomeAssignment}</option>
          <option value={Stage.Technical}>{Stage.Technical}</option>
          <option value={Stage.Done}>{Stage.Done}</option>
        </select>

        <div className={ModalButtonContainerClassNames}>
          {!isNew && (
            <button
              onClick={handleDelete}
              className={ModalDeleteButtonClassNames}
            >
              Delete
            </button>
          )}
          <button onClick={onClose} className={ModalCancelButtonClassNames}>
            Cancel
          </button>
          <button onClick={handleSubmit} className={ModalSaveButtonClassNames}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
