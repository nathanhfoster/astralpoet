export type useBooleanTogglerStateType = boolean
export type useBooleanTogglerActionType = any
export type useBooleanTogglerDispatchType = (value?: any) => void
export type useBooleanTogglerType = (
	initializerArg?: useBooleanTogglerStateType,
) => [useBooleanTogglerStateType, useBooleanTogglerDispatchType]
