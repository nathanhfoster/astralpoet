import { Reducer } from 'react'
import { PayloadActionType } from '../types'
import ActionTypes from './actionTypes'

/**
 * Initializes a reducers state
 * @param {Reducer}
 * @returns {ReducerState}
 */

const getReducerDefaultState = (reducer: Reducer<any, PayloadActionType>) =>
	reducer(undefined, { type: ActionTypes.INIT })

export default getReducerDefaultState
