import { useState } from 'react'
import { isClientSide } from '@packages/utils/src'
import useEventListener from './useEventListener'
import useThrottledCallback from './useThrottledCallback'

interface Props {
	initialWidth?: number
	initialHeight?: number
	throttleMs?: number
}

function useWindowSize(params?: Props) {
	const { initialWidth, initialHeight, throttleMs } = params ?? {}
	const [windowSize, setWindowSize] = useState({
		width: isClientSide() ? window.innerWidth : initialWidth,
		height: isClientSide() ? window.innerHeight : initialHeight,
	})

	const setWindowSizeThrottled = useThrottledCallback(
		(params: typeof windowSize) => {
			setWindowSize(params)
		},
		[setWindowSize],
		throttleMs ?? 0,
	)

	useEventListener('resize', () => {
		const newSize = {
			width: window.innerWidth,
			height: window.innerHeight,
		}

		if (throttleMs) {
			setWindowSizeThrottled(newSize)
		} else {
			setWindowSize(newSize)
		}
	})

	return windowSize
}

export default useWindowSize

// Usage
// function App() {
//   const size = useWindowSize();

//   return (
//     <div>
//       {size.width}px / {size.height}px
//     </div>
//   );
// }
