import classNames from 'classnames'

import { Status } from '../../types/board'

export const getCardClassName = (isDragging: boolean) =>
  classNames(
    'p-4 bg-white rounded-lg shadow-sm cursor-pointer space-y-1',
    isDragging && 'bg-blue-50'
  )

export const getStatusPillClassName = (status: string) =>
  classNames(
    'inline-block px-2 py-1 text-xs font-semibold rounded-full',
    status === Status.Scheduled && 'bg-blue-100 text-blue-700',
    status === Status.AwaitingResponse && 'bg-yellow-100 text-yellow-700',
    status === Status.Offer && 'bg-green-100 text-green-700',
    status === Status.NoOffer && 'bg-red-100 text-red-700',
    status !== Status.Scheduled &&
      status !== Status.AwaitingResponse &&
      status !== Status.Offer &&
      'bg-gray-100 text-gray-700'
  )
