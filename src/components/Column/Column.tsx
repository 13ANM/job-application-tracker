import { Job } from '../../types/board'
import { Card } from '../Card/Card'

interface Props {
	title: string
	jobs: Job[]
}

export const Column = ({ title, jobs }: Props) => (
	<div>
		<h2 className='text-lg font-bold mb-4'>{title}</h2>
		<div className='space-y-2'>
			{jobs.map((job, index) => (
				<Card key={job.id} job={job} index={index} />
			))}
		</div>
	</div>
)
