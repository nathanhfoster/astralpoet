import React from 'react'
import { SidebarColor } from '@rewind-ui/core'
import { EntriesActions } from '@/contexts/EntriesContext'

export interface SidebarProps {
	color: SidebarColor
	setExpanded: React.Dispatch<React.SetStateAction<boolean>>
	setMobile: React.Dispatch<React.SetStateAction<boolean>>
	setColor: React.Dispatch<React.SetStateAction<SidebarColor>>
}

export interface SidebarMapStateToProps {}

export interface SidebarMapDispatchToProps {
	importEntries: typeof EntriesActions.importEntries
	exportEntries: typeof EntriesActions.exportEntries
}
export interface SidebarConnectedProps
	extends SidebarMapStateToProps,
		SidebarMapDispatchToProps,
		SidebarProps {}
