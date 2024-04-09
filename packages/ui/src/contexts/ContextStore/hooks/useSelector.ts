import { Context, useContext } from 'react'
import { ComponentPropsType } from '../connect/types'

const createUseSelectorHook = <State = unknown>(context: Context<State>) => {
	/**
	 * This hook simulates Redux's useSelector hook
	 * The problem is that the useContext API always causes a rerender
	 * If you want memoization, use the connect API
	 */
	const useSelector = <
		SelectedState = unknown,
		Props extends ComponentPropsType = {},
	>(
		mapStateToSelector: (state: State, props?: Props) => SelectedState,
		props?: Props,
	) => {
		const state = useContext<State>(context)

		const currentSelector = mapStateToSelector(state, props)

		return currentSelector
	}

	return useSelector
}

export default createUseSelectorHook
