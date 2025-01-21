import { describe, expect, it } from 'vitest'

import { Job } from '../../../types/board'
import { moveBetweenLists } from './move-between-lists'

describe('moveBetweenLists', () => {
  it('moves an item from the source list to the destination list', () => {
    const source = [
      { id: '1', title: 'Job 1' },
      { id: '2', title: 'Job 2' }
    ]
    const destination = [
      { id: '3', title: 'Job 3' },
      { id: '4', title: 'Job 4' }
    ]
    const { sourceClone, destClone, movedItem } = moveBetweenLists(
      source as Job[],
      destination as Job[],
      0,
      1
    )

    expect(movedItem.id).toBe('1')
    expect(sourceClone).toEqual([{ id: '2', title: 'Job 2' }])
    expect(destClone).toEqual([
      { id: '3', title: 'Job 3' },
      { id: '1', title: 'Job 1' },
      { id: '4', title: 'Job 4' }
    ])
  })
})
