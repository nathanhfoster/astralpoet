import { isFunction } from '@packages/utils/src'

/**
 * A generic reducer that augments the useReducer hook
 * to return the state if the options is a callback
 * @param {ReducerState} state
 * @param {ReducerAction | GetStateCallback} options
 * @returns
 */
const setStateReducer = <T extends Object>(state: T, action: any) =>
	(isFunction(action) ? action(state) : action) as T

export default setStateReducer
