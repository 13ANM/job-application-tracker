import { Job, Stage, Status } from './types/board'

export const sampleJobs: Job[] = [
	{
		id: '1',
		title: 'Frontend Developer',
		company: 'Google',
		stage: Stage.Applied,
		status: Status.Scheduled,
	},
	{
		id: '2',
		title: 'Backend Developer',
		company: 'Amazon',
		stage: Stage.HR,
		status: Status.AwaitingResponse,
	},
	{
		id: '3',
		title: 'Full Stack Developer',
		company: 'Meta',
		stage: Stage.Done,
		status: Status.Offer,
	},
]

export const stages: Stage[] = [
	Stage.Applied,
	Stage.HR,
	Stage.HomeAssignment,
	Stage.Technical,
	Stage.Done,
]
