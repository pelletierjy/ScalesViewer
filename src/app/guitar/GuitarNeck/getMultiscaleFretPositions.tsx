import { getStringScaleLength } from "../multiscaleConstants";

// Calculate fret positions for a multiscale guitar
export const getMultiscaleFretPositions = (
  totalWidth: number,
  fretCount: number,
  stringCount: number,
  trebleLength: number,
  bassLength: number,
  perpendicularFret: number = 9
): number[][] => {
  const FRET_RATIO = Math.pow(2, 1 / 12); // ~1.059463
  const positions: number[][] = [];

  // First, calculate raw positions for each string
  const rawPositions: number[][] = [];
  for (let stringIndex = 0; stringIndex < stringCount; stringIndex++) {
    const scaleLength = getStringScaleLength(
      stringIndex,
      stringCount,
      trebleLength,
      bassLength
    );
    
    const stringPositions: number[] = [];
    let remainingLength = scaleLength;
    
    // Calculate actual fret positions for this string
    for (let fret = 0; fret <= fretCount; fret++) {
      if (fret === 0) {
        stringPositions.push(0);
      } else {
        remainingLength = remainingLength / FRET_RATIO;
        const position = scaleLength - remainingLength;
        stringPositions.push(position);
      }
    }
    rawPositions.push(stringPositions);
  }

  // Find the perpendicular fret position for each string
  const perpPositions = rawPositions.map(positions => positions[perpendicularFret]);
  
  // Calculate the average position for the perpendicular fret
  const avgPerpPosition = perpPositions.reduce((a, b) => a + b, 0) / perpPositions.length;
  
  // Calculate offset for each string to align perpendicular fret
  const offsets = perpPositions.map(pos => avgPerpPosition - pos);
  
  // Apply offsets and normalize
  for (let stringIndex = 0; stringIndex < stringCount; stringIndex++) {
    const stringPositions = rawPositions[stringIndex].map(pos => pos + offsets[stringIndex]);
    
    // Normalize to totalWidth based on the last fret position of the bass string
    const maxPosition = rawPositions[stringCount - 1][fretCount] + offsets[stringCount - 1];
    const scaleFactor = totalWidth / maxPosition;
    
    const normalizedPositions = stringPositions.map(pos => pos * scaleFactor);
    positions.push(normalizedPositions);
  }

  return positions;
};

// Get fret endpoints for drawing angled frets
export const getMultiscaleFretEndpoints = (
  fretPositions: number[][],
  stringSpacing: number,
  stringCount: number,
  fretIndex: number
): { x1: number; y1: number; x2: number; y2: number } => {
  // Get position for top string (index 0)
  const x1 = fretPositions[0][fretIndex];
  const y1 = stringSpacing;
  
  // Get position for bottom string
  const x2 = fretPositions[stringCount - 1][fretIndex];
  const y2 = stringCount * stringSpacing;
  
  return { x1, y1, x2, y2 };
};