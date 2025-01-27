import { Stage } from '../../types/board'
import {
  ConfirmationModalBackdropClassNames,
  ConfirmationModalButtonContainerClassNames,
  ConfirmationModalCancelButtonClassNames,
  ConfirmationModalConfirmButtonClassNames,
  ConfirmationModalContainerClassNames,
  ConfirmationModalTextClassNames,
  ConfirmationModalTitleClassNames
} from './styles'

interface Props {
  stage: Stage
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmationModal = ({ stage, onConfirm, onCancel }: Props) => (
  <div className={ConfirmationModalBackdropClassNames}>
    <div className={ConfirmationModalContainerClassNames}>
      <h2 className={ConfirmationModalTitleClassNames}>Confirm Erase</h2>
      <p className={ConfirmationModalTextClassNames}>
        Are you sure you want to remove all items from the{' '}
        <strong>{stage}</strong> column?
      </p>
      <div className={ConfirmationModalButtonContainerClassNames}>
        <button
          onClick={onCancel}
          className={ConfirmationModalCancelButtonClassNames}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className={ConfirmationModalConfirmButtonClassNames}
        >
          Erase
        </button>
      </div>
    </div>
  </div>
)
