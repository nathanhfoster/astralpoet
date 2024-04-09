// Match wild card characters

const match = (a: string, b: string): boolean => {
	// If we reach at the end of both strings
	if (a.length == 0 && b.length == 0) {
		return true
	}

	// Make sure that the characters after '*' are present in b string.
	// This function assumes that the a string will not contain two consecutive '*'
	if (a.length > 1 && a[0] == '*' && b.length == 0) {
		return false
	}

	// If the a string contains '?' or current characters of both strings match
	if (
		(a.length > 1 && a[0] == '?') ||
		(a.length != 0 && b.length != 0 && a[0] == b[0])
	) {
		return match(a.substring(1), b.substring(1))
	}

	// If there is *, then there are two possibilities
	// a) We consider current character of b string
	// b) We ignore current character of b string.
	if (a.length > 0 && a[0] == '*') {
		return match(a.substring(1), b) || match(a, b.substring(1))
	}

	return false
}

export default match
