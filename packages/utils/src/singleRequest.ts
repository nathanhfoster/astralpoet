const hash = new Map()

const singleRequest = <F>(
	key: string,
	fn: (signal: AbortSignal) => Promise<F>,
	cleanup?: string[],
) => {
	if (hash.has(key)) {
		hash.get(key).abort()
		hash.delete(key)
	}

	if (cleanup?.length) {
		cleanup.forEach((key) => {
			if (hash.has(key)) {
				hash.get(key).abort()
				hash.delete(key)
			}
		})
	}

	const controller = new AbortController()
	const signal = controller.signal

	hash.set(key, controller)

	return fn(signal)
}

export default singleRequest
