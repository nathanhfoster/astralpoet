import type { ComponentType, ReactNode } from 'react'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next/types'

export type LayoutProps = {
	Footer?: ComponentType
	Header?: ComponentType
	children: ReactNode
}

export type NextPageWithLayout<P = any> = NextPage<P> & {
	Layout?: ComponentType<LayoutProps>
}

export type AppPropsWithLayout<P = any> = AppProps<P> & {
	Component: NextPageWithLayout<P>
}
