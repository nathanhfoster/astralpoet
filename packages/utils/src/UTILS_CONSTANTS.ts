export interface IScreenSizeBreakpoints {
	MobileLg: number
	MobileSm: number
	Tablet: number
	Laptop: number
	LaptopLg: number
	FourK: number
}

export const ScreenSizeBreakpoints: IScreenSizeBreakpoints = {
	MobileLg: 375,
	MobileSm: 320,
	Tablet: 768,
	Laptop: 1024,
	LaptopLg: 1440,
	FourK: 2560,
}

const GRAPH_MOCK_URL = 'http://localhost:8080/graphql'

const UTILS_CONSTANTS = {
	ScreenSizeBreakpoints,
	GRAPH_MOCK_URL,
}

export default UTILS_CONSTANTS
