const isPositiveNumberValue = (value: string | number): boolean => {
  const regex = /^[0-9\b]+$/;

  return value === "" || regex.test(`${value}`);
};

export default isPositiveNumberValue;
