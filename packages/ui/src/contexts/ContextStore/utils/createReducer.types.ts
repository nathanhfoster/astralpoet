import { Draft } from 'immer'
import {
	ActionCreatorWithoutPayload,
	PayloadAction,
	PayloadActionCreator,
} from '../types'
import { IsUnknownOrNonInferrable, NoInfer } from './tsHelpers'

export type InitialReducerState = Record<string, any>

type SliceReducer<S = any, P = any> = (
	state: Draft<S>,
	payload?: P,
) => NoInfer<S> | void | Draft<NoInfer<S>>

export type SliceReducers<State> = {
	[K: string]: SliceReducer<State, PayloadAction>
}

export type ActionTypeName<
	SliceName extends string,
	ActionName extends keyof any,
> = ActionName extends string | number ? `${SliceName}/${ActionName}` : string

export type CreateReducerActions<S extends InitialReducerState> = Record<
	string,
	SliceReducer<S>
>

type ActionCreatorForReducer<
	ActionFunction,
	Type extends string,
> = ActionFunction extends (state: any, payload: infer Payload) => any
	? IsUnknownOrNonInferrable<
			Payload,
			ActionCreatorWithoutPayload<Type>,
			PayloadActionCreator<Payload, Type>
		>
	: ActionCreatorWithoutPayload<Type>

export type ReducerActionCreators<
	Actions extends SliceReducers<any>,
	SliceName extends string,
> = {
	[Type in keyof Actions]: ActionCreatorForReducer<
		Actions[Type],
		ActionTypeName<SliceName, Type>
	>
}

export interface CreateReducerProps<
	N extends string,
	S extends InitialReducerState,
	A extends CreateReducerActions<S>,
> {
	name: N
	initialState: S
	actions: A
}
