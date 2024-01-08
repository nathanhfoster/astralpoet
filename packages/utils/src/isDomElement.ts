const hasElementType = typeof Element !== "undefined";

const isDomElement = (value: any): value is Element => {
  return hasElementType && value instanceof Element;
};

export default isDomElement;
