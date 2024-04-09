import {
	DependencyList,
	EffectCallback,
	useEffect,
	useLayoutEffect,
} from 'react'
import { isClientSide } from '@packages/utils/src'
import useIsMounted from './useIsMounted'

const useLayoutEffectAfterMount = (
	callback: EffectCallback,
	dependencies: DependencyList,
) => {
	const mounted = useIsMounted()
	const useIsomorphicLayoutEffect = isClientSide() ? useLayoutEffect : useEffect

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useIsomorphicLayoutEffect(
		() => (mounted ? callback() : undefined),
		dependencies,
	)

	return mounted
}

export default useLayoutEffectAfterMount
