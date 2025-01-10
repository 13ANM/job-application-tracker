import { useState } from 'react'
import { Stage, Status, Job } from '../../types/board'

interface Props {
	initialJob: Partial<Job>
	onClose: () => void
	onSave: (updated: Partial<Job>) => void
}

export const Modal = ({ initialJob, onClose, onSave }: Props) => {
	const [title, setTitle] = useState(initialJob.title || '')
	const [company, setCompany] = useState(initialJob.company || '')
	const [status, setStatus] = useState<Status>(
		initialJob.status || Status.Scheduled
	)
	const [stage, setStage] = useState<Stage>(initialJob.stage || Stage.Applied)

	function handleSubmit() {
		onSave({ title, company, status, stage })
	}

	return (
		<div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50'>
			<div className='bg-white p-4 rounded shadow-md w-96 space-y-4'>
				<h2 className='text-xl font-semibold'>
					{initialJob.id ? 'Edit Job' : 'Add Job'}
				</h2>
				<input
					className='w-full border p-2 rounded'
					placeholder='Title'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<input
					className='w-full border p-2 rounded'
					placeholder='Company'
					value={company}
					onChange={(e) => setCompany(e.target.value)}
				/>
				<select
					className='w-full border p-2 rounded'
					value={status}
					onChange={(e) => setStatus(e.target.value as Status)}
				>
					<option value={Status.Scheduled}>{Status.Scheduled}</option>
					<option value={Status.AwaitingResponse}>
						{Status.AwaitingResponse}
					</option>
					<option value={Status.Offer}>{Status.Offer}</option>
				</select>
				<select
					className='w-full border p-2 rounded'
					value={stage}
					onChange={(e) => setStage(e.target.value as Stage)}
				>
					<option value={Stage.Applied}>{Stage.Applied}</option>
					<option value={Stage.HR}>{Stage.HR}</option>
					<option value={Stage.HomeAssignment}>{Stage.HomeAssignment}</option>
					<option value={Stage.Technical}>{Stage.Technical}</option>
					<option value={Stage.Done}>{Stage.Done}</option>
				</select>
				<div className='flex justify-end space-x-2'>
					<button onClick={onClose} className='px-4 py-2 border rounded'>
						Cancel
					</button>
					<button
						onClick={handleSubmit}
						className='px-4 py-2 bg-blue-600 text-white rounded'
					>
						Save
					</button>
				</div>
			</div>
		</div>
	)
}
