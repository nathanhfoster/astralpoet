import isObject from './isObject'

const objectKeysHaveAValue = <T extends Object>(
	object: T,
	keys: Partial<keyof T>[],
) => {
	if (!isObject(object)) return false

	const hasValue = (key: keyof T) => Boolean(object[key] ?? false)

	if (!keys.every(hasValue)) {
		return false
	}

	return true
}

export default objectKeysHaveAValue
