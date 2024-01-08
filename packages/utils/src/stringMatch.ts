const escapeRegExp = (s: string) =>
  s?.replace?.(/[.*+?^${}()|[\]\\]/g, "\\$&") || ""; // $& means the whole matched string

const stringMatch = (s1: string, s2: string, caseSensitive = false) => {
  s1 = s1 || "";
  s2 = s2 || "";
  const flags = caseSensitive ? "g" : "gi";
  const cleanString1 = escapeRegExp(s1);
  const cleanString2 = escapeRegExp(s2);

  const regexMatch = new RegExp(cleanString2, flags);

  return cleanString1.match(regexMatch);
};

export default stringMatch;
