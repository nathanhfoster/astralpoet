import { GetServerSidePropsContext, NextPageContext } from 'next/types'
import Nookies, { destroyCookie, parseCookies, setCookie } from 'nookies'

export interface CookieManagerConsturctorArgs<T> {
	name: string
	context?: GetServerSidePropsContext | NextPageContext
	value?: T
}

class CookieManager<T> {
	name: CookieManagerConsturctorArgs<T>['name']
	context?: CookieManagerConsturctorArgs<T>['context']
	value?: CookieManagerConsturctorArgs<T>['value']

	constructor(args: CookieManagerConsturctorArgs<T>) {
		this.name = args.name
		this.context = args.context
		this.value = args.value
	}

	getCookies() {
		let Cookies

		if (this.context) {
			// Server
			Cookies = Nookies.get(this.context)
		} else {
			// Client
			Cookies = parseCookies()
		}

		return Cookies
	}

	getObject() {
		const Cookies = this.getCookies()
		const cookie = Cookies[this.name]
		let objectFromCookie: T | undefined

		try {
			if (cookie) {
				objectFromCookie = JSON.parse(cookie)
			}
		} catch (e) {
			console.error(e)
		}

		return objectFromCookie
	}

	setObject(value: T, options?: Parameters<typeof setCookie>['3']) {
		const valueToStringify = value ?? this.value

		if (valueToStringify === undefined) {
			console.error(
				'valueToStringify is undefined. Remember to either pass a value as a parameter to setObject or CookieManager constructor',
			)
		}

		setCookie(this.context, this.name, JSON.stringify(valueToStringify), {
			path: '/',
			...(options && {
				...options,
			}),
		})
	}

	deleteCookie() {
		destroyCookie(this.context, this.name, { path: '/' })
	}
}

export default CookieManager
