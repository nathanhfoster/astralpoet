/* eslint-disable react-hooks/rules-of-hooks */
import React, {
	ComponentType,
	FC,
	forwardRef as reactForwardRef,
	memo,
	useMemo,
	useRef,
} from 'react'
import { isFunction, shallowEquals } from '@packages/utils/src'
import createUseDispatchHook from '../hooks/useDispatch'
import useMemoComponent from '../hooks/useMemoComponent'
import createUseSelectorHook from '../hooks/useSelector'
import bindActionCreator from '../utils/bindActionCreator'
import defaultMergeProps from '../utils/defaultMergeProps'
import { ComponentPropsType, ConnectOptions } from './types'

/**
 * This HOC connects a component to one or more context store(s) that have a dispatch and a state context
 * and passes in mapped values as props specified by the mapStateToProps, and mapDispatchToProps callback
 * The reducer dispatch API from the DispatchContext
 * The state returned from passing the StateContext into the mapStateToProps callback
 * The Components ownProps recieved from an HOC parent
 */

const connect = <
	MSTPO extends ComponentPropsType = any,
	MDTPO extends ComponentPropsType = any,
	OWNP extends ComponentPropsType = any,
>({
	mapStateToPropsOptions = [],
	mapDispatchToPropsOptions = [],
	pure = true,
	forwardRef = false,
	mergeProps = defaultMergeProps,
	areOwnPropsEqual = shallowEquals,
	areMergedPropsEqual = shallowEquals,
}: ConnectOptions<MSTPO, MDTPO, OWNP>) => {
	const wrapWithConnect = <P extends ComponentPropsType>(
		WrappedComponent: ComponentType<P>,
	): ComponentType<Omit<P, keyof MSTPO | keyof MDTPO>> => {
		const wrappedComponentName =
			WrappedComponent.displayName || WrappedComponent.name || 'Component'

		const displayName = `Connect(${wrappedComponentName})`

		const ConnectFunction: FC<P & { forwardedRef?: any }> = ({
			forwardedRef,
			...ownProps
		}) => {
			const ownPropsRef = useRef(ownProps)
			// Map the consumption of the state contexts (via useContext hook) outside of the useMemo hooks
			const mapStateToPropsContexts = mapStateToPropsOptions.map((item) => {
				const useSelector = createUseSelectorHook(item.context)
				const contextState: ComponentPropsType = useSelector(
					item.mapStateToProps as any,
					ownProps as OWNP,
				)

				return contextState
			})

			const stateToProps = useMemo(
				() =>
					mapStateToPropsOptions.reduce(
						(acc: ComponentPropsType, _item, index) => {
							const contextState = mapStateToPropsContexts[index]
							const newProps = { ...acc, ...contextState }

							return newProps
						},
						{} as MSTPO,
					),
				// ownProps is the only depedancy
				// eslint-disable-next-line react-hooks/exhaustive-deps
				[ownProps],
			) as MSTPO

			// Map the consumption of the dispatch contexts (via useContext hook) outside of the useMemo hooks
			const mapDispatchToPropsContexts = mapDispatchToPropsOptions.map(
				(item) => {
					const useDispatch = createUseDispatchHook(item.context)
					const dispatch = useDispatch()

					return dispatch
				},
			)

			const dispatchToProps = useMemo(
				() => {
					return mapDispatchToPropsOptions.reduce(
						(acc: ComponentPropsType, item, index) => {
							const dispatch = mapDispatchToPropsContexts[index]

							Object.entries(
								isFunction(item.mapDispatchToProps)
									? item.mapDispatchToProps(ownPropsRef.current as OWNP)
									: item.mapDispatchToProps,
							).forEach(([actionName, action]) => {
								acc[actionName] = bindActionCreator(dispatch)(action as any)
							})

							return acc
						},
						{} as MDTPO,
					)
				},
				// no dependancies
				// eslint-disable-next-line react-hooks/exhaustive-deps
				[],
			) as MDTPO

			const mergedProps = mergeProps(
				stateToProps,
				dispatchToProps,
				ownProps as OWNP,
			)

			const ConnectedComponent = useMemoComponent<P>({
				Component: WrappedComponent,
				//@ts-ignore
				props: mergedProps,
				ref: forwardedRef,
				isEqual: pure ? areMergedPropsEqual : undefined,
			})

			return ConnectedComponent
		}

		const Connect = pure
			? memo(ConnectFunction, areOwnPropsEqual)
			: ConnectFunction

		// @ts-ignore
		Connect.WrappedComponent = WrappedComponent
		Connect.displayName = ConnectFunction.displayName = displayName

		if (forwardRef) {
			const ForwaredComponent = reactForwardRef<any, P>((props, ref) => (
				<Connect {...props} forwardedRef={ref} />
			))

			ForwaredComponent.displayName = displayName
			// @ts-ignore
			ForwaredComponent.WrappedComponent = WrappedComponent

			// @ts-ignore
			return ForwaredComponent
		}

		return Connect as any
	}

	return wrapWithConnect
}

export default connect
