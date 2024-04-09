import { MutableRefObject, useRef } from 'react'
import { shallowEquals } from '@packages/utils/src'
import usePreviousValue from '../../../hooks/usePreviousValue'
import { ComponentPropsType } from '../connect/types'
import useLazyMemo from './useLazyMemo'

/**
 * Returns a copy of the next props whose values shallowly differ from the previous ones
 * @param {object} props - the props you want to mutate
 * @returns {object} - the props whose values are shallowly differnt from the previous
 */
const usePropsThatChanged = <P extends ComponentPropsType>(
	nextProps: P = {} as Pick<P, any>,
) => {
	const previousProps: P = usePreviousValue<P>(nextProps)
	const propsThatChanged: MutableRefObject<Pick<P, any>> = useRef({})
	const propKeys: string[] = useLazyMemo(() => Object.keys(nextProps))

	// The key length between previousProps and nextProps must be the same
	propKeys.forEach((key) => {
		if (!shallowEquals(previousProps[key], nextProps[key])) {
			propsThatChanged.current[key] = nextProps[key]
		} else {
			delete propsThatChanged.current[key]
		}
	})

	return propsThatChanged.current
}

export default usePropsThatChanged
