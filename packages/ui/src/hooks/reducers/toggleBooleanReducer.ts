import type { Reducer } from 'react'
import { isBoolean } from '@packages/utils/src'
import type { useBooleanTogglerActionType } from '../useBooleanToggler/types'
/**
 * Toggles the boolean state if there is not an action passed in
 * else it sets the state to the action's passed value
 * @param {boolean} state - Current state of the reducer
 * @param {*=} action - Optional dispatched action
 * @returns {boolean} - The nextState of the reducer
 */
const toggleBooleanReducer: Reducer<boolean, useBooleanTogglerActionType> = (
	state,
	action,
) => {
	// If the type of the action is a boolean set the state to the action
	if (isBoolean(action)) {
		return action
	}

	// Otherwise toggle the state
	return !state
}

export default toggleBooleanReducer
