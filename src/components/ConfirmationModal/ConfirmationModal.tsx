import { Stage } from '../../types/board'

interface Props {
  stage: Stage
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmationModal = ({ stage, onConfirm, onCancel }: Props) => (
  <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50'>
    <div className='bg-white p-6 w-96 rounded shadow-md space-y-4'>
      <h2 className='text-xl font-semibold'>Confirm Erase</h2>
      <p className='text-sm text-gray-700'>
        Are you sure you want to remove all items from the{' '}
        <strong>{stage}</strong> column?
      </p>
      <div className='flex justify-end space-x-2'>
        <button
          onClick={onCancel}
          className='px-4 py-2 border rounded focus:outline-none hover:bg-gray-100'
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className='px-4 py-2 bg-red-600 text-white rounded focus:outline-none hover:bg-red-700'
        >
          Erase
        </button>
      </div>
    </div>
  </div>
)
