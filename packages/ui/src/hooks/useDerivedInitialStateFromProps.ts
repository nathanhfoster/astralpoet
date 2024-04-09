import { useState } from 'react'
import useEffectAfterMount from './useEffectAfterMount'
import usePreviousValue from './usePreviousValue'

const useDerivedInitialStateFromProps = <T, I extends (intialState: T) => any>(
	initialState: T | undefined,
	initializer: I,
) => {
	const oldState = usePreviousValue(initialState)
	const [derivedStateFromProps, setNewState] = useState(
		initializer(initialState as any),
	)

	useEffectAfterMount(() => {
		if (oldState !== initialState) {
			setNewState(initializer(initialState as any))
		}
	}, [initialState])

	return derivedStateFromProps as ReturnType<I>
}

export default useDerivedInitialStateFromProps
