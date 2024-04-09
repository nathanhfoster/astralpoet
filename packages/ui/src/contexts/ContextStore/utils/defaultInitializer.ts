import type { ContextStoreInitializer } from '../types'

const defaultInitializer: ContextStoreInitializer = <T extends Object>(
	stateOrProps = {} as T,
) => stateOrProps

export default defaultInitializer
