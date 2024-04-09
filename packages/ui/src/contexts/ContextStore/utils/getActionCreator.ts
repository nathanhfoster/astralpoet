import { ContextStoreError, PayloadAction, PayloadActionType } from '../types'
import getErrorMessage from './getErrorMessage'

export const getActionTypeCreator =
	<A extends PayloadActionType = PayloadActionType>(type: A['type']) =>
	(): PayloadActionType<A['type']> => ({ type })
export const getActionPayloadCreator =
	<A extends PayloadAction = PayloadAction>(type: A['type']) =>
	(payload?: A['payload']): PayloadAction<A['type'], A['payload']> => ({
		type,
		payload,
	})

export const getActionErrorPayloadCreator =
	<A extends PayloadAction = PayloadAction>(type: A['type']) =>
	(payload: ContextStoreError) =>
		getActionPayloadCreator(type)(getErrorMessage(payload))
