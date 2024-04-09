import { GetServerSidePropsContext, NextPageContext } from 'next/types'
import CookieManager from './CookieManager'

export const COOKIE_LAST_VISITED_URL = 'lastVisitedURL'
export const COOKIE_LAST_VISITED_URL_MAX_AGE_IN_SECONDS = 1800 // 30 minutes

class LastVisitedURLCookieManager extends CookieManager<string> {
	constructor(
		context?: GetServerSidePropsContext | NextPageContext,
		lastVisitedUrl?: string,
	) {
		super({ name: COOKIE_LAST_VISITED_URL, context, value: lastVisitedUrl })
	}
	getLastVisitedURLFromCookies() {
		const lastVisitedURL = this.getObject()

		return lastVisitedURL
	}

	setLastVisitedUrlCookie(lastVisitedUrl: string) {
		this.setObject(lastVisitedUrl, {
			maxAge: COOKIE_LAST_VISITED_URL_MAX_AGE_IN_SECONDS,
		})
	}
}

export default LastVisitedURLCookieManager
