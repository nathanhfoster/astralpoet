import React, { FC, memo, useCallback, useMemo } from 'react'
import { Sidebar as RewindSidebar, SidebarState } from '@rewind-ui/core'
import Image from 'next/image'
import { capitalize } from 'lodash-es'
import { SIDEBAR_COLORS } from './constants'
import { SidebarProps } from './types'
import { IconBriefcase, IconKey, IconLifeRing, IconRocketLaunch, IconShield, IconSliders, IconUsers, IconEnvelopeOpen, IconBook } from '@/packages/ui/src/icons'


const Sidebar: FC<SidebarProps> = ({ color, setExpanded, setMobile, setColor }) => {

    return (
        <RewindSidebar
            // className="md:min-w-[4.5rem]"
            color={color}
            onToggle={useCallback((state: SidebarState) => {
                setExpanded(state.expanded);
                setMobile(state.mobile);
            }, [setExpanded, setMobile])}
        >
            <RewindSidebar.Head>
                <RewindSidebar.Head.Logo>
                    <Image alt="Astral Poet" src="/images/favicon.png" height={28} width={28} />
                </RewindSidebar.Head.Logo>
                <RewindSidebar.Head.Title>Astral Poet</RewindSidebar.Head.Title>
                <RewindSidebar.Head.Toggle />
            </RewindSidebar.Head>

            <RewindSidebar.Nav>
                <RewindSidebar.Nav.Section>
                    <RewindSidebar.Nav.Section.Item icon={<IconRocketLaunch />} label="Dashboard" href="#" active>
                        <RewindSidebar.Nav.Section isChild>
                            {useMemo(() => SIDEBAR_COLORS.map(c => <RewindSidebar.Nav.Section.Item
                                key={c}
                                as="button"
                                onClick={() => setColor(c)}
                                icon={<span className="w-1 h-1 rounded bg-transparent" />}
                                label={capitalize(c)}
                                active={color === 'white'}
                            />), [color, setColor])}
                        </RewindSidebar.Nav.Section>
                    </RewindSidebar.Nav.Section.Item>
                </RewindSidebar.Nav.Section>

                <RewindSidebar.Nav.Section>
                    <RewindSidebar.Nav.Section.Title>Management</RewindSidebar.Nav.Section.Title>
                    <RewindSidebar.Nav.Section.Item icon={<IconBriefcase />} label="Clients" href="#" />
                    <RewindSidebar.Nav.Section.Item icon={<IconUsers />} label="Users" as="button">
                        <RewindSidebar.Nav.Section isChild>
                            <RewindSidebar.Nav.Section.Item
                                icon={<span className="w-1 h-1 rounded bg-transparent" />}
                                label="List all"
                                href="#"
                            />
                            <RewindSidebar.Nav.Section.Item
                                icon={<span className="w-1 h-1 rounded bg-transparent" />}
                                label="Add new"
                                href="#"
                            />
                            <RewindSidebar.Nav.Section.Item
                                icon={<span className="w-1 h-1 rounded bg-transparent" />}
                                label="Archived"
                                href="#"
                            />
                        </RewindSidebar.Nav.Section>
                    </RewindSidebar.Nav.Section.Item>
                    <RewindSidebar.Nav.Section.Item icon={<IconShield />} label="Roles" href="#" />
                    <RewindSidebar.Nav.Section.Item icon={<IconKey />} label="Permissions" href="#" />
                    <RewindSidebar.Nav.Section.Item icon={<IconSliders />} label="Settings" href="#" />
                </RewindSidebar.Nav.Section>

                <RewindSidebar.Nav.Section>
                    <RewindSidebar.Nav.Section.Title>Support</RewindSidebar.Nav.Section.Title>
                    <RewindSidebar.Nav.Section.Item icon={<IconLifeRing />} label="Contact" href="#" />
                    <RewindSidebar.Nav.Section.Item icon={<IconEnvelopeOpen />} label="Tickets" href="#" />
                    <RewindSidebar.Separator />
                    <RewindSidebar.Nav.Section.Item icon={<IconBook />} label="Documentation" href="#" />
                </RewindSidebar.Nav.Section>
            </RewindSidebar.Nav>

            <RewindSidebar.Footer>
                <div className="flex flex-col justify-center items-center text-sm">
                    <span className="font-semibold">Astral Poet</span>
                    <span>version x.y.z</span>
                </div>
            </RewindSidebar.Footer>
        </RewindSidebar>
    )
}

export default memo(Sidebar)
