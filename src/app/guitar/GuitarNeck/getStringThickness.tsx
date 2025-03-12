export const getStringThickness = (
  stringIndex: number,
  totalStrings: number
): number => {
  const maxThickness = 3;
  const increment = 0.4;
  return maxThickness - (totalStrings - 1 - stringIndex) * increment;
};
