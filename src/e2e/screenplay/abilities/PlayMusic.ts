import { Ability } from '@serenity-js/core';

export type PrecisionLevel = 'standard' | 'expert';

/**
 * PlayMusic ability allows actors to interact with audio playback
 */
export class PlayMusic extends Ability {
    constructor(private precision: PrecisionLevel = 'standard') {
        super();
    }

    static withPrecision(): PlayMusic {
        return new PlayMusic('expert');
    }

    static atBasicLevel(): PlayMusic {
        return new PlayMusic('standard');
    }

    static atExpertLevel(): PlayMusic {
        return new PlayMusic('expert');
    }

    getPrecision(): PrecisionLevel {
        return this.precision;
    }

    /**
     * Expert users require higher precision for audio playback
     */
    requiresHighPrecision(): boolean {
        return this.precision === 'expert';
    }

    /**
     * Get frequency tolerance based on precision level
     */
    getFrequencyTolerance(): number {
        return this.precision === 'expert' ? 0.01 : 0.1;
    }

    /**
     * Get timing tolerance based on precision level
     */
    getTimingTolerance(): number {
        return this.precision === 'expert' ? 5 : 50; // milliseconds
    }

    /**
     * Validate audio quality expectations
     */
    getAudioQualityExpectations(): {
        sampleRate: number;
        bitDepth: number;
        channels: number;
    } {
        return this.precision === 'expert' 
            ? { sampleRate: 48000, bitDepth: 24, channels: 2 }
            : { sampleRate: 44100, bitDepth: 16, channels: 2 };
    }
}