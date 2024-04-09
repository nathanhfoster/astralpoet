import {
	MouseEventHandler,
	MutableRefObject,
	useCallback,
	useState,
} from 'react'
import useEffectAfterMount from '../useEffectAfterMount'
import {
	CURSOR_MAP,
	getWidthHeightInitialState,
	getXYInitialState,
} from './constant'
import { UseResizeOptions } from './types'

const useResize = (
	ref: MutableRefObject<any> = { current: null },
	options: UseResizeOptions = {},
) => {
	const minWidth = options.minWidth

	const { step = 1, axis = 'horizontal' } = options
	const [coords, setCoords] = useState(getXYInitialState)
	const [dims, setDims] = useState(getWidthHeightInitialState)
	const [size, setSize] = useState(getWidthHeightInitialState)

	// onMouseDown={initializeResize}
	const initializeResize = useCallback<MouseEventHandler<Element>>(
		(event) => {
			if (!ref.current) return
			setCoords({ x: event.clientX, y: event.clientY })
			const { width, height } = window.getComputedStyle(ref.current)

			setDims({ width: parseInt(width, 10), height: parseInt(height, 10) })
		},
		[ref],
	)

	useEffectAfterMount(() => {
		// Round the size based to `props.step`.
		const getValue = (input: number) => {
			const roundedValue = Math.ceil(input / step) * step

			return roundedValue
		}

		const doDrag = (event: MouseEvent) => {
			if (!ref.current) return

			// Calculate the box size.
			const width = getValue(dims.width + event.clientX - coords.x)
			const height = getValue(dims.height + event.clientY - coords.y)
			const size = {
				width: minWidth && width < minWidth ? minWidth : width,
				height,
			}

			// Set the box size.
			switch (axis) {
				case 'both':
					ref.current.style.width = `${size.width}px`
					ref.current.style.height = `${size.height}px`
					break
				case 'horizontal':
					ref.current.style.width = `${size.width}px`
					break
				case 'vertical':
					ref.current.style.height = `${size.width}px`
					break
				default:
			}

			if (!(isNaN(size.width) || isNaN(size.height))) {
				setSize(size)
			}
		}

		const stopDrag = () => {
			document.removeEventListener('mousemove', doDrag, false)
			document.removeEventListener('mouseup', stopDrag, false)
		}

		document.addEventListener('mousemove', doDrag, false)
		document.addEventListener('mouseup', stopDrag, false)
	}, [dims, coords, step, ref, axis])

	return { initializeResize, size, cursor: CURSOR_MAP[axis] }
}

export default useResize
