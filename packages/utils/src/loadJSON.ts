const loadJSON = (file: File) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader()

		reader.readAsText(file)
		reader.onload = (e) => {
			const result = e.target?.result as string
			const json = JSON.parse(result)

			return resolve(json)
		}
		reader.onerror = (error) => reject(error)
	})

export default loadJSON
