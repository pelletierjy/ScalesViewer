import { describe, it, expect, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import globalConfigReducer, {
  toggleDarkMode,
  setInstrument,
  setScale,
  toggleShowFlats,
  toggleShowMonochrome,
  toggleShowDegrees,
  selectIsDarkMode,
  selectInstrument,
  selectScale,
  selectShowFlats,
  selectIsMonochrome,
  selectShowDegrees
} from '@/features/globalConfig/globalConfigSlice';
import { Instrument } from '@/lib/utils/instrument';
import { Scale } from '@/lib/utils/scaleType';

describe('globalConfigSlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        globalConfig: globalConfigReducer
      }
    });
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = store.getState().globalConfig;
      expect(state.isDarkMode).toBe(true);
      expect(state.instrument).toBe('piano');
      expect(state.scale).toEqual({
        root: 'A',
        type: 'major',
        mode: 'ionian'
      });
      expect(state.showFlats).toBe(false);
      expect(state.highlightRoots).toBe(true);
      expect(state.showDegrees).toBe(false);
    });
  });

  describe('reducers', () => {
    describe('toggleDarkMode', () => {
      it('should toggle dark mode', () => {
        const initialState = store.getState().globalConfig.isDarkMode;
        store.dispatch(toggleDarkMode());
        expect(store.getState().globalConfig.isDarkMode).toBe(!initialState);
        
        store.dispatch(toggleDarkMode());
        expect(store.getState().globalConfig.isDarkMode).toBe(initialState);
      });
    });

    describe('setInstrument', () => {
      it('should set instrument', () => {
        const instrument: Instrument = 'guitar';
        store.dispatch(setInstrument(instrument));
        expect(store.getState().globalConfig.instrument).toBe('guitar');
      });

      it('should handle all valid instruments', () => {
        const instruments: Instrument[] = ['guitar', 'piano', 'kalimba', 'harmonica'];
        instruments.forEach(instrument => {
          store.dispatch(setInstrument(instrument));
          expect(store.getState().globalConfig.instrument).toBe(instrument);
        });
      });
    });

    describe('setScale', () => {
      it('should set scale', () => {
        const scale: Scale = { root: 'G', type: 'minor' };
        store.dispatch(setScale(scale));
        expect(store.getState().globalConfig.scale).toEqual(scale);
      });

      it('should handle modal scales', () => {
        const modalScale: Scale = { root: 'D', type: 'major', mode: 'dorian' };
        store.dispatch(setScale(modalScale));
        expect(store.getState().globalConfig.scale).toEqual(modalScale);
      });

      it('should handle different scale types', () => {
        const scales: Scale[] = [
          { root: 'C', type: 'major' },
          { root: 'A', type: 'minor' },
          { root: 'G', type: 'pentatonic' },
          { root: 'E', type: 'blues' },
          { root: 'F#', type: 'dorian' }
        ];

        scales.forEach(scale => {
          store.dispatch(setScale(scale));
          expect(store.getState().globalConfig.scale).toEqual(scale);
        });
      });
    });

    describe('toggleShowFlats', () => {
      it('should toggle show flats', () => {
        const initialState = store.getState().globalConfig.showFlats;
        store.dispatch(toggleShowFlats());
        expect(store.getState().globalConfig.showFlats).toBe(!initialState);
        
        store.dispatch(toggleShowFlats());
        expect(store.getState().globalConfig.showFlats).toBe(initialState);
      });
    });

    describe('toggleShowMonochrome', () => {
      it('should toggle show monochrome', () => {
        const initialState = store.getState().globalConfig.highlightRoots;
        store.dispatch(toggleShowMonochrome());
        expect(store.getState().globalConfig.highlightRoots).toBe(!initialState);
        
        store.dispatch(toggleShowMonochrome());
        expect(store.getState().globalConfig.highlightRoots).toBe(initialState);
      });
    });

    describe('toggleShowDegrees', () => {
      it('should toggle show degrees', () => {
        const initialState = store.getState().globalConfig.showDegrees;
        store.dispatch(toggleShowDegrees());
        expect(store.getState().globalConfig.showDegrees).toBe(!initialState);
        
        store.dispatch(toggleShowDegrees());
        expect(store.getState().globalConfig.showDegrees).toBe(initialState);
      });
    });
  });

  describe('selectors', () => {
    it('should select dark mode', () => {
      const state = store.getState();
      expect(selectIsDarkMode(state)).toBe(true);
      
      store.dispatch(toggleDarkMode());
      const newState = store.getState();
      expect(selectIsDarkMode(newState)).toBe(false);
    });

    it('should select instrument', () => {
      const state = store.getState();
      expect(selectInstrument(state)).toBe('piano');
      
      store.dispatch(setInstrument('guitar'));
      const newState = store.getState();
      expect(selectInstrument(newState)).toBe('guitar');
    });

    it('should select scale', () => {
      const state = store.getState();
      expect(selectScale(state)).toEqual({
        root: 'A',
        type: 'major',
        mode: 'ionian'
      });
      
      const newScale: Scale = { root: 'D', type: 'minor' };
      store.dispatch(setScale(newScale));
      const newState = store.getState();
      expect(selectScale(newState)).toEqual(newScale);
    });

    it('should select show flats', () => {
      const state = store.getState();
      expect(selectShowFlats(state)).toBe(false);
      
      store.dispatch(toggleShowFlats());
      const newState = store.getState();
      expect(selectShowFlats(newState)).toBe(true);
    });

    it('should select is monochrome', () => {
      const state = store.getState();
      expect(selectIsMonochrome(state)).toBe(true);
      
      store.dispatch(toggleShowMonochrome());
      const newState = store.getState();
      expect(selectIsMonochrome(newState)).toBe(false);
    });

    it('should select show degrees', () => {
      const state = store.getState();
      expect(selectShowDegrees(state)).toBe(false);
      
      store.dispatch(toggleShowDegrees());
      const newState = store.getState();
      expect(selectShowDegrees(newState)).toBe(true);
    });
  });

  describe('complex scenarios', () => {
    it('should handle multiple sequential updates', () => {
      store.dispatch(toggleDarkMode());
      store.dispatch(setInstrument('guitar'));
      store.dispatch(setScale({ root: 'D', type: 'minor' }));
      store.dispatch(toggleShowFlats());
      store.dispatch(toggleShowDegrees());

      const state = store.getState().globalConfig;
      expect(state.isDarkMode).toBe(false);
      expect(state.instrument).toBe('guitar');
      expect(state.scale).toEqual({ root: 'D', type: 'minor' });
      expect(state.showFlats).toBe(true);
      expect(state.showDegrees).toBe(true);
    });

    it('should handle edge case values', () => {
      // Test with complex scale
      const complexScale: Scale = { root: 'F#', type: 'major', mode: 'lydian' };
      store.dispatch(setScale(complexScale));
      expect(store.getState().globalConfig.scale).toEqual(complexScale);
    });
  });
});