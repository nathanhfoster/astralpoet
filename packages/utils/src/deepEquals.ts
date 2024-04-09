import hasProp from './hasProp'
import isArray from './isArray'
import isDate from './isDate'
import isDomElement from './isDomElement'
import isObject from './isObject'

const keyList = Object.keys

const deepEquals = <T = any>(a: T, b: T) => {
	if (a === b) return true

	if (a && b && isObject(a) && isObject(b)) {
		const arrA = isArray<T>(a),
			arrB = isArray<T>(b)

		let i, length, key

		if (arrA && arrB) {
			length = a.length
			if (length != b.length) return false
			for (i = length; i-- !== 0; ) if (!deepEquals(a[i], b[i])) return false

			return true
		}

		if (arrA != arrB) return false

		const dateA = isDate(a),
			dateB = isDate(b)

		if (dateA != dateB) return false
		if (dateA && dateB) return a.getTime() == b.getTime()

		const regexpA = a instanceof RegExp,
			regexpB = b instanceof RegExp

		if (regexpA != regexpB) return false
		if (regexpA && regexpB) return a.toString() == b.toString()

		const keys = keyList(a)

		length = keys.length

		if (length !== keyList(b).length) return false

		for (i = length; i-- !== 0; ) if (!hasProp.call(b, keys[i])) return false

		// custom handling for DOM elements
		if (isDomElement(a)) return false

		// custom handling for React
		for (i = length; i-- !== 0; ) {
			key = keys[i]
			//@ts-ignore
			if (key === '_owner' && a.$$typeof) {
				// React-specific: avoid traversing React elements' _owner.
				//  _owner contains circular references
				// and is not needed when comparing the actual elements (and not their owners)
				// .$$typeof and ._store on just reasonable markers of a react element
				continue
			} else {
				//@ts-ignore all other properties should be traversed as usual
				if (!deepEquals(a[key], b[key])) return false
			}
		}

		return true
	}

	return a !== a && b !== b
}

export default deepEquals
