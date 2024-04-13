import { ServerResponse } from 'http'
import { GetServerSidePropsContext, NextPageContext } from 'next'

export const navigateFromServer = (
	context: GetServerSidePropsContext | NextPageContext,
	Location: string,
) => {
	try {
		if (hasWritableServerResponse(context.res)) {
			context.res.writeHead(302, { Location })
			context.res?.end(`Navigated to ${Location}`)
		}
	} catch (e) {
		console.error(e)
	}
}

export const hasServerResponse = (
	res?: ServerResponse,
): res is ServerResponse => res instanceof ServerResponse

export const hasWritableServerResponse = (
	res?: ServerResponse,
): res is ServerResponse => hasServerResponse(res) && !res.writableEnded
