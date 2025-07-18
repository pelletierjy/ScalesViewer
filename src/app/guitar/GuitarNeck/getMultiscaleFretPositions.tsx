import { getStringScaleLength } from "../multiscaleConstants";

// Calculate fret positions for a multiscale guitar
export const getMultiscaleFretPositions = (
  totalWidth: number,
  fretCount: number,
  stringCount: number,
  trebleLength: number,
  bassLength: number
): number[][] => {
  const FRET_RATIO = Math.pow(2, 1 / 12); // ~1.059463
  const positions: number[][] = [];

  // Calculate positions for each string
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
    
    // Normalize positions to totalWidth
    // Use the bass string (longest) as the reference for scaling
    const maxPosition = bassLength - (bassLength / Math.pow(FRET_RATIO, fretCount));
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