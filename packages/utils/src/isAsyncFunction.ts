const isAsyncFunction = (fn: any): fn is Function =>
	fn.constructor.name === 'AsyncFunction'

export default isAsyncFunction
