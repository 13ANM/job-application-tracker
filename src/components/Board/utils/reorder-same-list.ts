import { Job } from '../../../types/board'

export function reorderSameList(
	list: Job[],
	startIndex: number,
	endIndex: number
) {
	const result = [...list]
	const [removed] = result.splice(startIndex, 1)
	result.splice(endIndex, 0, removed)
	return result
}
