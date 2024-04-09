const getCsvDataUrl = (rows: string[][]): string =>
	`data:text/csv;charset=utf-8;base64,${Buffer.from(
		rows.join('\n'),
		'binary',
	).toString('base64')}`

export default getCsvDataUrl
