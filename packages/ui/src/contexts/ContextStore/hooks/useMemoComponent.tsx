import { ComponentType, MutableRefObject, useMemo, useRef } from 'react'
import { isFunction } from '@packages/utils/src'
import usePreviousValue from '../../../hooks/usePreviousValue'
import { ComponentPropsType, EqualityFunctionType } from '../connect/types'

export interface useMemoComponentOptions<P extends ComponentPropsType> {
	Component: ComponentType<P>
	props: P
	ref?: MutableRefObject<P>
	isEqual?: EqualityFunctionType<P>
}

export type useMemoComponentType = <P extends ComponentPropsType>(
	options: useMemoComponentOptions<P>,
) => JSX.Element | null

/**
 * Hook that controls the reference of a component to only update when it's previous and next props differ
 */
const useMemoComponent: useMemoComponentType = ({
	Component,
	props,
	ref,
	isEqual,
}) => {
	const previousProps = usePreviousValue(props)

	// Component ref instance
	const ComponentRef = useRef(<Component {...props} ref={ref} />)

	const PureComponent = useMemo(() => {
		// Check if props have stayed the same
		const arePropsEqual = isFunction(isEqual)
			? isEqual(previousProps, props)
			: false

		// If the props differ update the reference of the component instance
		if (!arePropsEqual) {
			ComponentRef.current = <Component {...props} ref={ref} />
		}

		return ComponentRef.current
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props, Component])

	return PureComponent
}

export default useMemoComponent
