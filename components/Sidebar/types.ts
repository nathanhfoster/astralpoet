import React from 'react'
import { SidebarColor } from '@rewind-ui/core'

export interface SidebarProps {
	color: SidebarColor
	setExpanded: React.Dispatch<React.SetStateAction<boolean>>
	setMobile: React.Dispatch<React.SetStateAction<boolean>>
	setColor: React.Dispatch<React.SetStateAction<SidebarColor>>
}
