// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const formatMoney = (moneyValue: string, showDollarSign = true) => {
  const nextValue = `${moneyValue}`
    .replace(",", ".")
    .replace(/[^0-9.]/g, "")
    .trimLeft();

  if (nextValue.length <= 0) {
    return "";
  }

  const [dollar, cent] = nextValue.split(".", 2);

  return typeof cent !== "undefined"
    ? `${showDollarSign ? "$ " : ""}${dollar}.${cent.substring(0, 2)}`
    : `${showDollarSign ? "$ " : ""}${dollar}`;
};

export default formatMoney;
