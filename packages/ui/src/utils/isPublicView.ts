import { match } from '@packages/utils/src'
import { NextRouter } from 'next/router'

const isPublicView = (router?: NextRouter) => {
	const hasMatch = (page: string) => match(page, router?.pathname ?? '')

	return hasMatch
}

export default isPublicView
