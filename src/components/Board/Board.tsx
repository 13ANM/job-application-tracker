import React from 'react'
import { stages, sampleJobs } from '../../sampleData'
import { Stage, Job } from '../../types/board'
import Card from '../Card/Card'

export const Board: React.FC = () => {
	// Group jobs by their stage
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
							<Card key={job.id} job={job} />
						))}
					</div>
				</div>
			))}
		</div>
	)
}
