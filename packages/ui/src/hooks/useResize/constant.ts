import { CursorMap } from './types'

const X_Y_INITIAL_STATE = Object.freeze({ x: Infinity, y: Infinity })

const WIDTH_HEIGHT_INITIAL_STATE = Object.freeze({
	width: Infinity,
	height: Infinity,
})

export const CURSOR_MAP: CursorMap = {
	both: 'nwse-resize',
	vertical: 'ns-resize',
	horizontal: 'ew-resize',
}

export const getXYInitialState = () => X_Y_INITIAL_STATE

export const getWidthHeightInitialState = () => WIDTH_HEIGHT_INITIAL_STATE
