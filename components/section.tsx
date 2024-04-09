import React from 'react'

interface Props {
	children: React.ReactNode
}

const Section = ({ children }: Props) => <section>{children}</section>

export default Section
