import React, { useCallback } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import Calendar from '@/components/Calendar'
import EntryList from '@/components/EntryList'
import Layout from '@/components/Layout'
import {
	EntriesActions,
	EntriesDispatchContext,
} from '@/contexts/EntriesContext'
import {
	getEntryFromDb,
	saveEntryToDb,
} from '@/contexts/EntriesContext/indexedDb'
import { EntriesContextState, Entry } from '@/contexts/EntriesContext/types'
import connect from '@/packages/ui/src/contexts/ContextStore/connect'
import { NextPageWithLayout } from '@/packages/ui/src/types'
import { getValidDate } from '@/packages/utils/src'

interface CalendarMapStateToProps
	extends Pick<EntriesContextState, 'entries'> {}

interface CalendarMapDispatchToProps {
	setEntry: typeof EntriesActions.setEntry
}

interface CalendarProps {}

interface CalendarConnectedProps
	extends CalendarMapStateToProps,
		CalendarMapDispatchToProps,
		CalendarProps {}

const CalendarPage: NextPageWithLayout<CalendarConnectedProps> = ({
	setEntry,
}) => {
	const router = useRouter()

	const handleCalendarChange = useCallback(
		async (date: Date | null | undefined) => {
			if (date) {
				const date_created = getValidDate(date, true)
				const newEntry = {
					date_created,
					date_updated: date_created,
					title: `Diary entry on ${date.toLocaleDateString('en-CA')}`,
					html: "After I've installed Astral Poet today, I will make a diary entry every day from now on. In case I forget to make an entry, the app will remind me with a notification in the evening. In addition to photos, videos, audio recordings or other files, I can also add a location, tags or people to my diary entries.✍ I can use it on all my devices and synchronize the journal with the sync button on the main page. I am already looking forward to revisiting all those memories in a few months or years. ✨",
				}

				await saveEntryToDb(newEntry as Entry).then(async (e) => {
					if (e) {
						await getEntryFromDb(e.result).then((savedEntry) => {
							if (savedEntry) {
								setEntry(savedEntry.result)

								router.push({
									pathname: `/entry/${String(savedEntry.result.id)}`,
								})
							}
						})
					}
				})
			}
		},
		[router, setEntry],
	)

	return (
		<div className='grid grid-cols-12 gap-4'>
			<div className='md:col-span-8 col-span-12'>
				{/*@ts-ignore*/}
				<Calendar onChange={handleCalendarChange} />
			</div>
			<div className='md:col-span-4 col-span-12'>
				<EntryList />
			</div>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async (
	_context: GetServerSidePropsContext,
) => {
	const props: CalendarProps = {}

	return {
		props,
	}
}

const ConnectedCalendarPage = connect<
	CalendarMapStateToProps,
	CalendarMapDispatchToProps,
	CalendarProps
>({
	mapDispatchToPropsOptions: [
		{
			context: EntriesDispatchContext,
			mapDispatchToProps: {
				setEntry: EntriesActions.setEntry,
			},
		},
	],
})(CalendarPage)

//@ts-ignore
ConnectedCalendarPage.Layout = Layout

export default ConnectedCalendarPage
