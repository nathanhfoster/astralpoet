import { Context, Dispatch, useContext } from 'react'
/**
 * Hook that consumers a DispatchContext and returns it's dispatch API
 */

const createUseDispatchHook = <T = unknown>(
	DispatchContext: Context<Dispatch<T>>,
): (() => Dispatch<T>) => {
	const useDispatch = () => {
		const dispatch = useContext<Dispatch<T>>(DispatchContext)

		return dispatch
	}

	return useDispatch
}

export default createUseDispatchHook
