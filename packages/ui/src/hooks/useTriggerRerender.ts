import { useReducer } from 'react'
import triggerRerenderReducer from './reducers/triggerRerenderReducer'

/**
 * Hook that returns a callback to force a rerender of a component
 * @returns {function} - Dispatch API that forces a rerender
 */
const useTriggerRerender = () => {
	const [, triggerRerender] = useReducer(triggerRerenderReducer, 0)

	return triggerRerender
}

export default useTriggerRerender
