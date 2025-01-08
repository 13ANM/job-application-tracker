import React from 'react'
import { Job } from '../../types/board'

interface CardProps {
	job: Job
}

const Card: React.FC<CardProps> = ({ job }) => {
	return (
		<div className='p-4 bg-white rounded-lg shadow-sm border'>
			<h3 className='font-medium'>{job.title}</h3>
			<p className='text-sm text-gray-500'>{job.company}</p>
			<p className='text-sm text-blue-500'>{job.status}</p>
		</div>
	)
}

export default Card
