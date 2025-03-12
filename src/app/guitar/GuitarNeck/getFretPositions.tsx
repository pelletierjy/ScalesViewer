// Calculate fret positions using the 12th root of 2
export const getFretPositions = (
  totalWidth: number,
  fretCount: number
): number[] => {
  const positions: number[] = [];
  const FRET_RATIO = Math.pow(2, 1 / 12); // ~1.059463

  // First calculate the raw positions
  let remainingLength = 1; // Start with unit length
  let currentPosition = 0;

  for (let i = 0; i <= fretCount; i++) {
    positions.push(currentPosition);
    remainingLength = remainingLength / FRET_RATIO;
    currentPosition = 1 - remainingLength;
  }

  // Scale the positions to the total width
  const lastPosition = positions[positions.length - 1];
  return positions.map((pos) => (pos / lastPosition) * totalWidth);
};
