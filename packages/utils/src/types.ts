export type TestToRun<T = any> = {
	name?: string
	args?: any
	expected: T
}

export type RunTests = (
	callback: (...args: any[]) => any,
	tests: TestToRun<unknown>[],
) => void
