import {
	Context,
	FC,
	ForwardRefExoticComponent,
	NamedExoticComponent,
	RefAttributes,
} from 'react'

export type ComponentPropsType = Record<string, any>

export type MapStateToPropsCallback<
	MSTP = any,
	S = Record<string, any>,
	OWNP = any,
> = (state: S, ownProps: OWNP) => Partial<MSTP>

export type MapStateToPropsItem<MSTP = any, S = any, OWNP = any> = {
	context: Context<S>
	mapStateToProps: MapStateToPropsCallback<MSTP, S, OWNP>
}

export type MapDispatchToPropsArrayItem<MDTPO = any, T = any, P = any> = {
	context: Context<React.Dispatch<T>>
	mapDispatchToProps:
		| Partial<Record<keyof MDTPO, (...args: any[]) => any>>
		| ((ownProps: P) => Partial<Record<keyof MDTPO, (...args: any[]) => any>>)
}

export type MergePropsType<MSTP = {}, MDTPO = {}, OWNP = {}> = (
	stateToProps: Record<string, any>,
	dispatchToProps: MDTPO,
	ownProps: OWNP,
) => Partial<MSTP> & Partial<MDTPO> & Partial<OWNP>

export type EqualityFunctionType<
	P extends ComponentPropsType = ComponentPropsType,
> = (prevPropsOrState: P, nextPropsOrState: P) => boolean

export type ConnectOptions<MSTP = {}, MDTPO = {}, OWNP = {}> = {
	mapStateToPropsOptions?: MapStateToPropsItem<MSTP, any, OWNP>[]
	mapDispatchToPropsOptions?: MapDispatchToPropsArrayItem<MDTPO, any, OWNP>[]
	pure?: boolean
	forwardRef?: boolean
	mergeProps?: MergePropsType<MSTP, MDTPO, OWNP>
	areOwnPropsEqual?: EqualityFunctionType
	areMergedPropsEqual?: EqualityFunctionType
}

export type ConnectedComponent<P extends ComponentPropsType> =
	| ForwardRefExoticComponent<RefAttributes<unknown>>
	| FC<
			P & {
				forwardedRef?: any
			}
	  >
	| NamedExoticComponent<
			P & {
				forwardedRef?: any
			}
	  >
