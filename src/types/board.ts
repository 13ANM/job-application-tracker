export enum Stage {
  Applied = 'Applied',
  HR = 'HR',
  HomeAssignment = 'Home Assignment',
  Technical = 'Technical',
  Done = 'Done'
}

export enum Status {
  Scheduled = 'Scheduled',
  AwaitingResponse = 'Awaiting Response',
  NoOffer = 'No Offer',
  Offer = 'Offer'
}

export const StatusesByStage: Record<Stage, Status[]> = {
  [Stage.Applied]: [Status.Scheduled, Status.AwaitingResponse],
  [Stage.HR]: [Status.Scheduled, Status.AwaitingResponse],
  [Stage.HomeAssignment]: [Status.Scheduled, Status.AwaitingResponse],
  [Stage.Technical]: [Status.Scheduled, Status.AwaitingResponse],
  [Stage.Done]: [Status.AwaitingResponse, Status.NoOffer, Status.Offer]
}

export interface Job {
  id: string
  title: string
  company: string
  stage: Stage
  status: Status
  link?: string
  notes?: string
}
