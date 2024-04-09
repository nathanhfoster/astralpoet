import { isEqual, pickBy } from 'lodash-es'

const getObjectDiffKeys = (
	originalObject: Record<string, any>,
	updatedObject: Record<string, any>,
): string[] => {
	const diff = pickBy(updatedObject, (v, k) => !isEqual(originalObject[k], v))

	let keys = Object.keys(diff)

	if (keys.includes('instream_outstream')) {
		const videoItems = [
			'instream_outstream',
			'skippability',
			'video_outstream_type',
			'video_player_size',
			'video_viewability_level',
		]

		keys = keys.filter((val) => !videoItems.includes(val))
		keys.push('video_targeting')
	}

	return keys
}

export default getObjectDiffKeys
