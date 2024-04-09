import { useEffect, useRef } from 'react'

const useIsMounted = (initialValue = false): boolean => {
	const mounted = useRef(initialValue)

	useEffect(() => {
		mounted.current = true

		return () => {
			mounted.current = false
		}
	})

	return mounted.current
}

export default useIsMounted
