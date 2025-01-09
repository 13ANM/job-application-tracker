import { Job } from '../../types/board'

interface CardProps {
	job: Job
}

export const Card = ({ job }: CardProps) => {
	return (
		<div>
			<h3 className='font-medium'>{job.title}</h3>
			<p className='text-sm text-gray-500'>{job.company}</p>
			<p className='text-sm text-blue-500'>{job.status}</p>
		</div>
	)
}
