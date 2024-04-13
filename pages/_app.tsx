import React, { Fragment } from 'react'
import type { AppContext, AppInitialProps } from 'next/app'
import App from 'next/app'
import { ThemeProvider } from 'next-themes'
import { EntriesContextProvider } from '@/contexts/EntriesContext'
import { Entry } from '@/contexts/EntriesContext/types'
import { AppPropsWithLayout } from '@/packages/ui/src/types'

import '@/styles/globals.css'

interface MainAppProps {
	entries: Entry[]
}

const MainApp = ({
	Component,
	pageProps,
}: AppPropsWithLayout<MainAppProps>) => {
	const Layout = Component.Layout ?? Fragment

	return (
		<ThemeProvider
			attribute='class'
			defaultTheme='system'
			disableTransitionOnChange
		>
			<EntriesContextProvider initialState={pageProps.entries}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</EntriesContextProvider>
		</ThemeProvider>
	)
}

MainApp.displayName = 'Astral Poet'

MainApp.getInitialProps = async (
	appContext: AppContext,
): Promise<AppInitialProps<MainAppProps>> => {
	const appProps = await App.getInitialProps(appContext)
	const entries: Entry[] = []

	return {
		...appProps,
		pageProps: { entries, ...((appProps.pageProps ?? {}) as {}) },
	}
}

export default MainApp
