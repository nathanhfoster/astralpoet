import type { ComponentType, ReactNode } from 'react'
import type { NextPage } from 'next'

export type RequiredNotNull<T> = {
	[P in keyof T]: NonNullable<T[P]>
}
export type PickEnsure<T, K extends keyof T> = Required<
	RequiredNotNull<Pick<T, K>>
>

export type Ensure<T, K extends keyof T> = T & PickEnsure<T, K>

export type LayoutProps = {
	Footer?: ComponentType
	Header?: ComponentType
	children: ReactNode
}

export type NextPageWithLayout<P = any> = NextPage<P> & {
	Layout?: ComponentType<LayoutProps>
}

export type NextAppInitialProps<P = any> = {
	pageProps: P
}

export type ValueComponent<T = any> = {
	value: T
}

export type DataComponent<T extends object> = {
	data: T[]
}

export type DataConfigComponent<
	T extends object,
	C extends object = {},
> = DataComponent<T> & {
	config: C[]
}

export type NumberBoolean = 0 | 1

export interface Paggination<SB extends string> {
	limit: number
	offset: number
	search: string
	sort_by: SB
	sort_direction: 'asc' | 'desc'
}

/**
 * Represent a generic function.
 * Used internally to improve code readability
 */
export type GenericFunction = (...args: any[]) => any

/**
 * Typed generic callback function, used mostly internally
 * to defined callback setters
 */
export type SomeCallback<TArgs, TResult = void> = (...args: TArgs[]) => TResult

/**
 * A callback setter is generally used to set the value of
 * a callback that will be used to perform updates
 */
export type CallbackSetter<TArgs> = (nextCallback: SomeCallback<TArgs>) => void

export type Falsely =
	| null
	| undefined
	| false
	| typeof NaN
	| 0
	| -0
	| BigInt
	| ''

export type Truthy<T> = T extends Falsely ? never : T
