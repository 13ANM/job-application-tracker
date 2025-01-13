import { Job } from '../../../types/board'

export function moveBetweenLists(
	source: Job[],
	destination: Job[],
	sourceIndex: number,
	destinationIndex: number
) {
	const sourceClone = [...source]
	const destClone = [...destination]
	const [removed] = sourceClone.splice(sourceIndex, 1)
	destClone.splice(destinationIndex, 0, removed)
	return { sourceClone, destClone, movedItem: removed }
}
