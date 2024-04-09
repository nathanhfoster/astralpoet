type MapFunctionCallback<T> = (item: T, index: number) => any

const filterMap = <
	T,
	F extends MapFunctionCallback<T>,
	M extends boolean = false,
>(
	array: T[],
	filterFn: (item: M extends true ? ReturnType<F> : T, index: number) => any,
	mapFn: F,
	mapFirst?: M,
): ReturnType<F>[] => {
	return array.reduce((acc, item, i) => {
		let newItem = mapFirst ? mapFn(item, i) : undefined

		if (filterFn(mapFirst ? newItem : item, i)) {
			if (!newItem) {
				newItem = mapFn(item, i)
			}

			acc.push(newItem)
		}

		return acc
	}, [] as ReturnType<F>[])
}

export default filterMap
