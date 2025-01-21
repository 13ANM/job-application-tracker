// reorder-same-list.test.ts
import { describe, expect, it } from 'vitest'

import { Job } from '../../../types/board'
import { reorderSameList } from './reorder-same-list'

describe('reorderSameList', () => {
  it('reorders items in the same list correctly', () => {
    const list: Job[] = [
      { id: '1', title: 'Job 1' },
      { id: '2', title: 'Job 2' },
      { id: '3', title: 'Job 3' }
    ] as Job[]

    const result = reorderSameList(list, 0, 2)

    expect(result).toEqual([
      { id: '2', title: 'Job 2' },
      { id: '3', title: 'Job 3' },
      { id: '1', title: 'Job 1' }
    ])
  })

  it('handles no change when start and end index are the same', () => {
    const list = [
      { id: '1', title: 'Job 1' },
      { id: '2', title: 'Job 2' },
      { id: '3', title: 'Job 3' }
    ] as Job[]

    const result = reorderSameList(list, 1, 1)

    expect(result).toEqual([
      { id: '1', title: 'Job 1' },
      { id: '2', title: 'Job 2' },
      { id: '3', title: 'Job 3' }
    ])
  })
})
