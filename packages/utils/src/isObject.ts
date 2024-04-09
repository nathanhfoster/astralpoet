const isObject = (value: any): value is Object => {
	const type = typeof value

	return value != null && (type === 'object' || type === 'function')
}

export default isObject
