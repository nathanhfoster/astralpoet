import { useEffect, useRef } from 'react'

const usePreviousValue = <T>(value: T): T => {
	const ref = useRef(value)

	useEffect(() => {
		ref.current = value
	})

	return ref.current
}

export default usePreviousValue
