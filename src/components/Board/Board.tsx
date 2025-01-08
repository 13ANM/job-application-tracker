import React from 'react'
import { stages, sampleJobs } from '../../sampleData'
import { Stage, Job } from '../../types/board'

export const Board: React.FC = () => {
	const jobsByStage = stages.reduce((acc, stage) => {
		acc[stage] = sampleJobs.filter((job) => job.stage === stage)

		return acc
	}, {} as Record<Stage, Job[]>)

	return (
		<div className='flex space-x-4 p-4'>
			{stages.map((stage) => (
				<div key={stage} className='flex-1 p-4 bg-gray-100 rounded-lg shadow'>
					<h2 className='text-lg font-bold mb-4'>{stage}</h2>
					<div className='space-y-2'>
						{jobsByStage[stage]?.map((job) => (
							<div
								key={job.id}
								className='p-4 bg-white rounded-lg shadow-sm border'
							>
								<h3 className='font-medium'>{job.title}</h3>
								<p className='text-sm text-gray-500'>{job.company}</p>
								<p className='text-sm text-blue-500'>{job.status}</p>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	)
}
