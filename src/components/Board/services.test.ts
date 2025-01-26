import { describe, expect, it, vi } from 'vitest'

import { supabase } from '../../supabase'
import { Job, Stage } from '../../types/board'
import {
  createJobInSupabase,
  deleteColumnInSupabase,
  deleteJobInSupabase,
  fetchJobsFromSupabase,
  groupJobsByStage,
  updateJobInSupabase
} from './services'

vi.mock('../../supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        data: [{ id: '1', title: 'Mock Title', stage: Stage.Applied }],
        error: null
      })),

      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          data: [{ id: '2', title: 'Inserted Title', stage: Stage.Applied }],
          error: null
        }))
      })),

      update: vi.fn(() => ({
        eq: vi.fn(() => ({
          select: vi.fn(() => ({
            data: [{ id: '3', title: 'Updated Title', stage: Stage.HR }],
            error: null
          }))
        }))
      })),

      delete: vi.fn(() => ({
        eq: vi.fn(() => ({
          data: null,
          error: null
        }))
      }))
    }))
  }
}))

describe('services', () => {
  it('fetchJobsFromSupabase calls supabase.from("jobs").select("*")', async () => {
    const result = await fetchJobsFromSupabase()

    expect(supabase.from).toHaveBeenCalledWith('jobs')
    expect(result.data?.[0].title).toBe('Mock Title')
  })

  it('createJobInSupabase inserts a new job', async () => {
    const newJob = { title: 'New Title', stage: Stage.Applied }
    const result = await createJobInSupabase(newJob)

    expect(supabase.from).toHaveBeenCalledWith('jobs')
    expect(result.data?.[0].title).toBe('Inserted Title')
  })

  it('updateJobInSupabase updates a job', async () => {
    const updatedJob = {
      id: '3',
      title: 'Updated Title',
      stage: Stage.HR,
      company: 'Mock Co',
      status: 'Scheduled',
      link: 'http://example.com',
      notes: 'Some notes'
    } as Job
    const result = await updateJobInSupabase(updatedJob)

    expect(supabase.from).toHaveBeenCalledWith('jobs')
    expect(result.data?.[0].title).toBe('Updated Title')
    expect(result.data?.[0].stage).toBe(Stage.HR)
  })

  it('deleteJobInSupabase deletes a job by id', async () => {
    const jobToDelete = { id: '999' } as Job
    const result = await deleteJobInSupabase(jobToDelete)

    expect(supabase.from).toHaveBeenCalledWith('jobs')
    expect(result.error).toBe(null)
  })

  it('deleteColumnInSupabase deletes all jobs by stage', async () => {
    const stageToDelete = Stage.HR
    const result = await deleteColumnInSupabase(stageToDelete)

    expect(supabase.from).toHaveBeenCalledWith('jobs')
    expect(result.error).toBe(null)
  })

  it('groupJobsByStage groups jobs correctly', () => {
    const jobs = [
      { id: '1', title: 'T1', stage: Stage.Applied },
      { id: '2', title: 'T2', stage: Stage.Applied },
      { id: '3', title: 'T3', stage: Stage.HR },
      { id: '4', title: 'T4', stage: Stage.Done }
    ] as Job[]

    const grouped = groupJobsByStage(jobs)

    expect(grouped[Stage.Applied]).toHaveLength(2)
    expect(grouped[Stage.HR]).toHaveLength(1)
    expect(grouped[Stage.Done]).toHaveLength(1)
  })
})
