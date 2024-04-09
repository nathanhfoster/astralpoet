function fixUrlSchema(url: string): string {
	return url.startsWith('http://') || url.startsWith('https://')
		? url
		: 'https://' + url
}

export default fixUrlSchema
