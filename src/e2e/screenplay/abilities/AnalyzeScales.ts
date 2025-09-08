import { Ability } from '@serenity-js/core';

export type AnalysisLevel = 'basic' | 'standard' | 'expert';

/**
 * AnalyzeScales ability allows actors to analyze musical scales and theory
 */
export class AnalyzeScales extends Ability {
    constructor(private level: AnalysisLevel = 'standard') {
        super();
    }

    static atBasicLevel(): AnalyzeScales {
        return new AnalyzeScales('basic');
    }

    static atStandardLevel(): AnalyzeScales {
        return new AnalyzeScales('standard');
    }

    static atExpertLevel(): AnalyzeScales {
        return new AnalyzeScales('expert');
    }

    getLevel(): AnalysisLevel {
        return this.level;
    }

    /**
     * Check if actor can analyze complex scales (modes, exotic scales)
     */
    canAnalyzeComplexScales(): boolean {
        return this.level === 'expert';
    }

    /**
     * Check if actor can analyze harmonic relationships
     */
    canAnalyzeHarmonicRelationships(): boolean {
        return this.level === 'expert' || this.level === 'standard';
    }

    /**
     * Get expected scales knowledge based on level
     */
    getExpectedScalesKnowledge(): string[] {
        switch (this.level) {
            case 'expert':
                return [
                    'Major', 'Minor', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian',
                    'Harmonic Minor', 'Melodic Minor', 'Hungarian Minor', 'Neapolitan Major', 'Neapolitan Minor',
                    'Whole Tone', 'Diminished', 'Pentatonic Major', 'Pentatonic Minor', 'Blues', 'Bebop'
                ];
            case 'standard':
                return [
                    'Major', 'Minor', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian',
                    'Harmonic Minor', 'Melodic Minor', 'Pentatonic Major', 'Pentatonic Minor', 'Blues'
                ];
            case 'basic':
                return [
                    'Major', 'Minor', 'Pentatonic Major', 'Pentatonic Minor'
                ];
        }
    }

    /**
     * Get tuning system knowledge based on level
     */
    getTuningSystemKnowledge(): string[] {
        switch (this.level) {
            case 'expert':
                return [
                    'Equal Temperament', 'Just Intonation', 'Well Temperament', 
                    'Pythagorean', 'Mean Tone', '19-TET', '31-TET'
                ];
            case 'standard':
                return [
                    'Equal Temperament', 'Just Intonation', 'Well Temperament'
                ];
            case 'basic':
                return [
                    'Equal Temperament'
                ];
        }
    }

    /**
     * Validate scale accuracy expectations
     */
    getScaleAccuracyTolerance(): number {
        return this.level === 'expert' ? 0.001 : 0.01; // Frequency tolerance
    }

    /**
     * Get expected response time for complex analysis
     */
    getAnalysisResponseTimeExpectation(): number {
        return this.level === 'expert' ? 100 : 500; // milliseconds
    }
}