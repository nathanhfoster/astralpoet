import { getValidDate, isArray, isString } from '@/packages/utils/src'
import { Entry } from './types'

export const getStringFromObject = (obj: Object, key = 'name') => {
	if (!Array.isArray(obj)) return obj

	return obj.reduce((acc, e, i, { length }) => {
		const value = e[key]

		if (length === 1 || i === length - 1) {
			acc += value
		} else {
			acc += `${value},`
		}

		return acc
	}, '')
}

export const getObjectFromString = (s: string, key = 'name') => {
	if (!isString(s) || !s) return []

	return s.split(',').reduce((acc: { [key: string]: string }[], name) => {
		if (name) {
			acc.push({ [key]: name })
		}

		return acc
	}, [])
}

export const getTagStringFromObject = (tagOrPeople: Entry['tags']) =>
	getStringFromObject(tagOrPeople)

export const getTagObjectFromString = (s: string) => getObjectFromString(s)

export const entryTagOrPeopleTransform = (
	tagsOrPeople: string,
	shouldExport = true,
) => {
	if (shouldExport) {
		return getTagStringFromObject(tagsOrPeople)
	}

	return getTagObjectFromString(tagsOrPeople)
}

export const entryDateTransform = (date: string) => getValidDate(date)

// export const arrayOfObjectsTransform = (
// 	EntryFiles: ImportedEntry['EntryFiles'],
// 	shouldExport = true,
// ) => {
// 	if (shouldExport) {
// 		return JSON.stringify(EntryFiles)
// 	}

// 	return JSON.parse(EntryFiles || '[]', jsonParseDates)
// }

export const stringToIntegerTransform = (s: string, shouldExport = true) => {
	if (shouldExport) {
		return `${s}`
	}
	const int = parseInt(s)

	if (isNaN(int)) {
		return s
	}

	return int
}

export const stringToFloatTransform = (s: string, shouldExport = true) => {
	if (shouldExport) {
		return `${s}`
	}
	const float = parseFloat(s)

	return float
}

export const stringToBoolTransform = (
	s: string | boolean,
	shouldExport = true,
) => {
	if (shouldExport) {
		if (s === true) return 'true'

		return 'false'
	}

	if (s === true) return true
	if (s === 'true') return true

	return false
}

export const jsonParseDates = (_key: string, value: unknown) =>
	getValidDate(value, true)

export const arrayOfObjectsTransform = (
	EntryFiles: string,
	shouldExport = true,
) => {
	if (shouldExport) {
		return JSON.stringify(EntryFiles)
	}

	return JSON.parse(EntryFiles || '[]', jsonParseDates)
}

export const entryKeyTransform = (entry: Entry) =>
	Object.keys(entry).map((key) => {
		const entryTransform: any = { key }

		switch (key) {
			case 'id':
			case 'author':
			case 'views':
			case 'rating':
			case 'size':
			case '_size':
				entryTransform.transform = stringToIntegerTransform
				break
			case 'latitude':
			case 'longitude':
				entryTransform.transform = stringToFloatTransform
				break
			case 'is_public':
			case '_shouldDelete':
			case '_shouldPost':
				entryTransform.transform = stringToBoolTransform
				break
			case 'tags':
			case 'people':
				entryTransform.transform = entryTagOrPeopleTransform
				break
			case 'date_created':
			case 'date_created_by_author':
			case 'date_updated':
			case '_lastUpdated':
			case '_calendarDate':
				entryTransform.transform = entryDateTransform
				break
			case 'EntryFiles':
				entryTransform.transform = arrayOfObjectsTransform
				break

			default:
				entryTransform.transform = (e: any) => e
		}

		return entryTransform
	})

export const getEntryTransform = (
	entry: Entry,
	returnObject = true,
	shouldExport = true,
) =>
	entryKeyTransform(entry).reduce(
		(acc, { key, transform }) => {
			const newEntryKey = transform(entry[key as keyof Entry], shouldExport)

			if (returnObject) {
				acc[key] = newEntryKey
			} else {
				acc.push(newEntryKey)
			}

			return acc
		},
		returnObject ? ({} as Entry) : ([] as any),
	)

export const formattedEntries = (entries: unknown) => {
	if (isArray(entries)) {
		return entries.map((entry) => getEntryTransform(entry, true, false))
	}

	return []
}
