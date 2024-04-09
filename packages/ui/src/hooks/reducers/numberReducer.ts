import { Reducer } from 'react'
import { isFunction, isNumber } from '@packages/utils/src'
import {
	ContextStoreActionCallback,
	PayloadActionType,
} from '@/packages/ui/src/contexts/ContextStore/types'

export const NUMBER_REDUCER_INCREMENT = 'INCREMENT'
export const NUMBER_REDUCER_DECREMENT = 'DECREMENT'

const numberReducer: Reducer<
	number,
	| PayloadActionType<typeof NUMBER_REDUCER_INCREMENT>
	| PayloadActionType<typeof NUMBER_REDUCER_DECREMENT>
	| ContextStoreActionCallback<number>
> = (state, action) => {
	if (isNumber(action)) {
		return action
	}

	if (isFunction(action)) {
		return action(state)
	}

	switch (action.type) {
		case NUMBER_REDUCER_INCREMENT:
			return state + 1

		case NUMBER_REDUCER_DECREMENT:
			return state - 1

		default:
			return state
	}
}

export default numberReducer
