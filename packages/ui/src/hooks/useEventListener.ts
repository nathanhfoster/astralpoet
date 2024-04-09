// original source - https://github.com/donavon/use-event-listener/blob/develop/src/index.js

import { useEffect, useRef } from 'react'
import { isClientSide } from '@packages/utils/src'

const useEventListener = (
	eventName: string,
	handler: (event: any) => any,
	element = isClientSide() ? window : undefined,
) => {
	const savedHandler = useRef<Function>()

	useEffect(() => {
		savedHandler.current = handler
	}, [handler])

	useEffect(() => {
		// Make sure element supports addEventListener
		// On
		const isSupported = element && element.addEventListener

		if (!isSupported) return

		const eventListener = (event: any) => savedHandler.current!(event)

		element.addEventListener(eventName, eventListener)

		return () => {
			element.removeEventListener(eventName, eventListener)
		}
	}, [eventName, element])
}

export default useEventListener

// Usage

// function App(){
//   // State for storing mouse coordinates
//   const [coords, setCoords] = useState({ x: 0, y: 0 });

//   // Event handler utilizing useCallback ...
//   // ... so that reference never changes.
//   const handler = useCallback(
//     ({ clientX, clientY }) => {
//       // Update coordinates
//       setCoords({ x: clientX, y: clientY });
//     },
//     [setCoords]
//   );

//   // Add event listener using our hook
//   useEventListener('mousemove', handler);

//   return (
//     <h1>
//       The mouse position is ({coords.x}, {coords.y})
//     </h1>
//   );
// }
