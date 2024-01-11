import React from 'react'
import type { AppContext, AppInitialProps, AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import '@/styles/globals.css'
import { Entry } from '@/contexts/EntriesContext/types'
import App from 'next/app'
import { EntriesContextProvider } from '@/contexts/EntriesContext'


interface MainAppProps extends AppProps { entries: Entry[] }

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

MainApp.displayName = "Astral Poet";

MainApp.getInitialProps = async (
	appContext: AppContext
): Promise<AppInitialProps<AppProps> > => {
	const appProps = await App.getInitialProps(appContext);
	const entries: Entry[] = [];

	return {
		...appProps,
		//@ts-ignore
		pageProps:( {
			...((appProps.pageProps ?? {}) as {}),
		} ) ,
		entries
	};
};


export default MainApp