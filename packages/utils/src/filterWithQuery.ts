const filterWithQuery = <T extends {}>(
	data: T[],
	query: string,
	fields: (keyof T)[],
) => {
	if (!query) return data

	return data.filter((item) => {
		for (const key of fields) {
			const field = item[key]

			if (field === null || field === undefined) continue

			return `${field}`.toLowerCase().includes(query.toLowerCase())
		}

		return false
	})
}

export default filterWithQuery
