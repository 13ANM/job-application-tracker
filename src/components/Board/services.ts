import { stages } from '../../constants'
import { supabase } from '../../supabase'
import { Job, Stage } from '../../types/board'

export const fetchJobsFromSupabase = async () => {
  return supabase.from('jobs').select('*')
}

export const createJobInSupabase = async (newJob: Partial<Job>) => {
  return supabase.from('jobs').insert(newJob).select()
}

export const updateJobInSupabase = async (updated: Job) => {
  return supabase
    .from('jobs')
    .update({
      title: updated.title,
      company: updated.company,
      status: updated.status,
      stage: updated.stage,
      link: updated.link,
      notes: updated.notes
    })
    .eq('id', updated.id)
    .select()
}

export const deleteJobInSupabase = async (job: Job) => {
  return supabase.from('jobs').delete().eq('id', job.id)
}

export const deleteColumnInSupabase = async (stage: Stage) => {
  return supabase.from('jobs').delete().eq('stage', stage)
}

export const groupJobsByStage = (data: Job[]) => {
  return stages.reduce(
    (acc, stage) => {
      acc[stage] = data.filter(job => job.stage === stage)
      return acc
    },
    {} as Record<Stage, Job[]>
  )
}
