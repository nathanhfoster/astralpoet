import { useReducer } from 'react'
import toggleBooleanReducer from '../reducers/toggleBooleanReducer'
import { useBooleanTogglerType } from './types'

/**
 * Boolean reducer that toggles it's state by default or is overwritten by a passed value
 * @param {object.<string, *>=} initializerArg - initial state of the reducer
 * @param {function(object.<string, *>) => boolean=} initializer - callback that initilizes the reducer's state
 * @returns {array.<object.<string, *>, function(): boolean>} - the new useReducer hook [toggle, setToggle]
 */

const useBooleanToggler: useBooleanTogglerType = (initializerArg = false) =>
	useReducer(toggleBooleanReducer, Boolean(initializerArg))

export default useBooleanToggler
