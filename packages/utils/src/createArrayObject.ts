const createArrayObject = <T, U = T>(
	length: number,
	mapfn: (v: T, k: number) => U,
	thisArg?: any,
): U[] => Array.from({ length }, mapfn, thisArg)

export default createArrayObject
