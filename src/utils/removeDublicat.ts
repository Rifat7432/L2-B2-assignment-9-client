export const removeDuplicates = <T>(arr: T[]): T[] =>
  arr.filter((item, index, array) => array.indexOf(item) === index);
