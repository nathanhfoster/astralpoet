function screenMaxWidth(breakpoint: number) {
	return window.matchMedia(`(max-width: ${breakpoint}px)`).matches
}

export default screenMaxWidth
