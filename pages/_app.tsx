import React from 'react'
import type { AppContext, AppInitialProps, AppProps } from 'next/app'
import App from 'next/app'
import { ThemeProvider } from 'next-themes'
import { EntriesContextProvider } from '@/contexts/EntriesContext'
import { Entry } from '@/contexts/EntriesContext/types'

import '@/styles/globals.css'

interface MainAppProps extends AppProps {
	entries: Entry[]
}

const MainApp = ({ Component, pageProps, entries }: MainAppProps) => {
	return (
		<ThemeProvider
			attribute='class'
			defaultTheme='system'
			disableTransitionOnChange
		>
			<EntriesContextProvider initialState={entries}>
				<Component {...pageProps} />
			</EntriesContextProvider>
		</ThemeProvider>
	)
}

MainApp.displayName = 'Astral Poet'

MainApp.getInitialProps = async (
	appContext: AppContext,
): Promise<AppInitialProps<AppProps>> => {
	const appProps = await App.getInitialProps(appContext)
	const entries: Entry[] = [
		{ id: 7777, name: 'Test' },
		{ id: 77, name: 'Test' },
		{ id: 77, name: 'Test' },
	]

	return {
		...appProps,
		//@ts-ignore
		pageProps: {
			...((appProps.pageProps ?? {}) as {}),
		},
		entries,
	}
}

export default MainApp
