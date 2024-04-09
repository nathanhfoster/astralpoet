// use-isomorphic-layout-effect.js
import { useEffect, useLayoutEffect } from 'react'
import { isClientSide } from '@packages/utils/src'

/**
 * useLayoutEffect hook that works on both the client and server side
 */
const useIsomorphicLayoutEffect = isClientSide() ? useLayoutEffect : useEffect

export default useIsomorphicLayoutEffect
