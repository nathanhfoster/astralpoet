import React, { FC, useCallback, useMemo } from 'react'
import { Input, Sidebar as RewindSidebar, SidebarState } from '@rewind-ui/core'
import { capitalize } from 'lodash-es'
import getConfig from 'next/config'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {
	EntriesActions,
	EntriesDispatchContext,
} from '@/contexts/EntriesContext'
import { connect } from '@/packages/ui'
import { IconEnvelopeOpen, IconRocketLaunch } from '@/packages/ui/src/icons'
import { SIDEBAR_COLORS } from './constants'
import {
	SidebarConnectedProps,
	SidebarMapDispatchToProps,
	SidebarMapStateToProps,
	SidebarProps,
} from './types'

const config = getConfig()

const Sidebar: FC<SidebarConnectedProps> = ({
	color,
	setExpanded,
	setMobile,
	setColor,
	importEntries,
	exportEntries,
}) => {
	const appVersion = config?.publicRuntimeConfig?.version
	const router = useRouter()

	return (
		<RewindSidebar
			// className="md:min-w-[4.5rem]"
			color={color}
			onToggle={useCallback(
				(state: SidebarState) => {
					setExpanded(state.expanded)
					setMobile(state.mobile)
				},
				[setExpanded, setMobile],
			)}
		>
			<RewindSidebar.Head>
				<RewindSidebar.Head.Logo>
					<Image
						alt='Astral Poet'
						src='/images/favicon.png'
						height={28}
						width={28}
					/>
				</RewindSidebar.Head.Logo>
				<RewindSidebar.Head.Title>Astral Poet</RewindSidebar.Head.Title>
				<RewindSidebar.Head.Toggle />
			</RewindSidebar.Head>
			<RewindSidebar.Nav>
				<RewindSidebar.Nav.Section>
					<RewindSidebar.Nav.Section.Item
						icon={<IconRocketLaunch />}
						label='Dashboard'
						href='/'
						active
					>
						<RewindSidebar.Nav.Section isChild>
							{useMemo(
								() =>
									SIDEBAR_COLORS.map((c) => (
										<RewindSidebar.Nav.Section.Item
											key={c}
											as='button'
											onClick={() => setColor(c)}
											icon={<span className='w-1 h-1 rounded bg-transparent' />}
											label={capitalize(c)}
											active={color === 'white'}
										/>
									)),
								[color, setColor],
							)}
						</RewindSidebar.Nav.Section>
					</RewindSidebar.Nav.Section.Item>
				</RewindSidebar.Nav.Section>

				<RewindSidebar.Nav.Section>
					<RewindSidebar.Nav.Section.Title>
						Views
					</RewindSidebar.Nav.Section.Title>
					<RewindSidebar.Nav.Section.Item
						icon={<IconEnvelopeOpen />}
						label='Entries'
						as='button'
					>
						<RewindSidebar.Nav.Section isChild>
							<RewindSidebar.Nav.Section.Item
								icon={<span className='w-1 h-1 rounded bg-transparent' />}
								label='Calendar'
								href='/entries/calendar'
								active={router.pathname === '/entries/calendar'}
							/>
							<RewindSidebar.Nav.Section.Item
								icon={<span className='w-1 h-1 rounded bg-transparent' />}
								label='Table'
								href='/entries/table'
								active={router.pathname === '/entries/table'}
							/>
						</RewindSidebar.Nav.Section>
					</RewindSidebar.Nav.Section.Item>
				</RewindSidebar.Nav.Section>

				<RewindSidebar.Nav.Section>
					<RewindSidebar.Nav.Section.Title>
						Management
					</RewindSidebar.Nav.Section.Title>
					<RewindSidebar.Nav.Section.Item
						icon={<IconEnvelopeOpen />}
						label='Entries'
						as='button'
					>
						<RewindSidebar.Nav.Section isChild>
							<RewindSidebar.Nav.Section.Item
								icon={<span className='w-1 h-1 rounded bg-transparent' />}
								label='Import'
							>
								<Input
									type='file'
									accept='.json'
									title='Import'
									onChange={importEntries}
									multiple={false}
								/>
							</RewindSidebar.Nav.Section.Item>
							<RewindSidebar.Nav.Section.Item
								icon={<span className='w-1 h-1 rounded bg-transparent' />}
								label='Export'
								onClick={exportEntries}
							></RewindSidebar.Nav.Section.Item>
						</RewindSidebar.Nav.Section>
					</RewindSidebar.Nav.Section.Item>
				</RewindSidebar.Nav.Section>
			</RewindSidebar.Nav>

			<RewindSidebar.Footer>
				<div className='flex flex-col justify-center items-center text-sm'>
					<span className='font-semibold'>Astral Poet</span>
					<span>version {appVersion}</span>
				</div>
			</RewindSidebar.Footer>
		</RewindSidebar>
	)
}

export default connect<
	SidebarMapStateToProps,
	SidebarMapDispatchToProps,
	SidebarProps
>({
	mapDispatchToPropsOptions: [
		{
			context: EntriesDispatchContext,
			mapDispatchToProps: {
				importEntries: EntriesActions.importEntries,
				exportEntries: EntriesActions.exportEntries,
			},
		},
	],
})(Sidebar)
