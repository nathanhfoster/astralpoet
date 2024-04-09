function isMobile(window: Window) {
	return /Mobile/i.test(window.navigator.userAgent)
}

export default isMobile
