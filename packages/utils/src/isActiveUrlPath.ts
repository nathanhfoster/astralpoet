const isActiveUrlPath = (href: string, routerPath: string) => {
	return routerPath.includes(href)
}

export default isActiveUrlPath
