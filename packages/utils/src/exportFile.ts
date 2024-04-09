export const FILE_NAME_EXTENSIONS = {
	'text/json': 'json',
	'text/csv;charset=utf-8;': 'csv',
}

const exportFile = (
	data: Object | string | null | undefined,
	name = 'formattedJson',
	type = 'text/json',
) => {
	const fileName = `${name}.${FILE_NAME_EXTENSIONS[type as keyof typeof FILE_NAME_EXTENSIONS]}`
	// const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data))
	// let downloadAnchorNode = document.createElement('a')
	// downloadAnchorNode.setAttribute('href', dataStr)
	// downloadAnchorNode.setAttribute('download', fileName)
	// document.body.appendChild(downloadAnchorNode) // required for firefox
	// downloadAnchorNode.click()
	// downloadAnchorNode.remove()

	if (!data) {
		alert('No data')

		return
	}

	if (typeof data === 'object' && type === 'text/json') {
		data = JSON.stringify(data, undefined, 4)
	}

	const blob = new Blob([data as BlobPart], { type }),
		e = document.createEvent('MouseEvents'),
		a = document.createElement('a')

	if ((window.navigator as any)?.msSaveBlob) {
		// IE 10+
		;(window.navigator as any).msSaveBlob(blob, fileName)
	} else if ((window.navigator as any)?.msSaveOrOpenBlob) {
		;(window.navigator as any).msSaveOrOpenBlob(blob, fileName)

		return
	} else if (window.URL?.createObjectURL) {
		a.download = fileName
		a.href = window.URL.createObjectURL(blob)
		a.dataset.downloadurl = [type, a.download, a.href].join(':')
		e.initMouseEvent(
			'click',
			true,
			false,
			window,
			0,
			0,
			0,
			0,
			0,
			false,
			false,
			false,
			false,
			0,
			null,
		)
		a.dispatchEvent(e)
	}

	return data
}

export default exportFile
