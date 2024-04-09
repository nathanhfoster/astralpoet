import getRandomString from './getRandomString'

export type ContextActionTypes = {
	INIT: string
	REPLACE: string
	PROBE_UNKNOWN_ACTION: () => string
}
/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */

const ActionTypes: ContextActionTypes = {
	INIT: `@@redux/INIT${getRandomString()}`,
	REPLACE: `@@redux/REPLACE${getRandomString()}`,
	PROBE_UNKNOWN_ACTION: () =>
		`@@redux/PROBE_UNKNOWN_ACTION${getRandomString()}`,
}

export default ActionTypes
