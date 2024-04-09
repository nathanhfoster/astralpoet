export default function dataURItoBlob(dataURI: string) {
	const byteString = Buffer.from(dataURI.split(',')[1], 'base64').toString(
		'binary',
	)
	const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

	const ab = new ArrayBuffer(byteString.length)
	const ia = new Uint8Array(ab)

	for (let i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i)
	}

	return new Blob([ab], { type: mimeString })
}
