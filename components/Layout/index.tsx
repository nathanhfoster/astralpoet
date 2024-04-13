import React, { FC, ReactNode, useState } from 'react'
import { Button, Overlay, SidebarColor, useSidebar } from '@rewind-ui/core'
import Section from '@/components/section'
import Sidebar from '@/components/Sidebar'
import { SIDEBAR_COLORS } from '@/components/Sidebar/constants'

interface LayoutProps {
	children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
	const [expanded, setExpanded] = useState(true)
	const [mobile, setMobile] = useState(false)
	const sidebar = useSidebar()
	const [color, setColor] = useState<SidebarColor>(SIDEBAR_COLORS[1])

	return (
		<div className='relative antialiased flex flex-row bg-slate-100'>
			<Sidebar
				color={color}
				setExpanded={setExpanded}
				setMobile={setMobile}
				setColor={setColor}
			/>

			<main
				className={`transition-all transform duration-300 text-slate-700 flex w-full min-h-screen flex-col items-center ${
					expanded ? 'md:ml-[16rem]' : 'md:ml-[4.5rem]'
				}`}
			>
				{mobile && (
					<Overlay
						blur='none'
						onClick={() => {
							sidebar.toggleMobile()
						}}
						className='md:hidden z-40'
					/>
				)}
				<header className='flex flex-row sticky top-0 px-8 items-center bg-white border-b border-b-gray-100 w-full shadow-sm min-h-[4rem]'>
					<span>Navbar</span>

					<Button
						onClick={() => {
							sidebar.toggleMobile()
						}}
						size='sm'
						color='white'
						icon
						className='ml-auto flex md:hidden'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							height='1em'
							viewBox='0 0 448 512'
						>
							<path d='M448 96c0-17.7-14.3-32-32-32H32C14.3 64 0 78.3 0 96s14.3 32 32 32H416c17.7 0 32-14.3 32-32zm0 320c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32z' />
							<path
								className='opacity-50'
								d='M0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32z'
							/>
						</svg>
					</Button>
				</header>

				<div className='w-full h-full md:p-4'>
					<Section>{children}</Section>
				</div>

				<div className='flex sticky bottom-0 items-center bg-white w-full min-h-[4rem] px-8'>
					<span>Footer</span>
				</div>
			</main>
		</div>
	)
}

export default Layout
