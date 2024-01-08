const isArray = <T = any>(value: any): value is Array<T> =>
  Array.isArray(value);

export default isArray;
