import React, { FC, SVGProps } from 'react'

export interface BaseProps extends SVGProps<SVGSVGElement> {}

const BaseSvg: FC<BaseProps> = ({ children, ...restOfProps }) => {
	return (
		<svg
			{...restOfProps}
			className='fill-current stroke-current'
			xmlns='http://www.w3.org/2000/svg'
			height='1rem'
			width='1rem'
			stroke='currentColor'
			fill='currentColor'
		>
			{children}
		</svg>
	)
}

export default BaseSvg
