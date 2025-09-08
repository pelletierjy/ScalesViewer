// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { vi, beforeEach } from 'vitest';

// Mock the window.matchMedia function which is not available in Vitest
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock AudioContext for audio testing
const createMockAudioContext = () => {
  const mockDestination = {
    channelCount: 2,
    channelCountMode: 'max',
    channelInterpretation: 'speakers'
  };

  const mockOscillator = {
    frequency: { 
      setValueAtTime: vi.fn(),
      value: 440
    },
    type: 'sine',
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
    disconnect: vi.fn(),
    onended: null
  };

  const mockGain = {
    gain: { 
      setValueAtTime: vi.fn(),
      linearRampToValueAtTime: vi.fn(),
      exponentialRampToValueAtTime: vi.fn(),
      value: 1
    },
    connect: vi.fn(),
    disconnect: vi.fn()
  };

  return {
    createOscillator: vi.fn(() => mockOscillator),
    createGain: vi.fn(() => mockGain),
    destination: mockDestination,
    currentTime: 0,
    sampleRate: 44100,
    state: 'running',
    suspend: vi.fn().mockResolvedValue(undefined),
    resume: vi.fn().mockResolvedValue(undefined),
    close: vi.fn().mockResolvedValue(undefined)
  };
};

// Mock both AudioContext and webkitAudioContext
global.AudioContext = vi.fn().mockImplementation(createMockAudioContext);
global.webkitAudioContext = vi.fn().mockImplementation(createMockAudioContext);

// Mock localStorage
const localStorageMock = (function () {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    length: 0,
    key: vi.fn()
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Reset all mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
  localStorageMock.getItem.mockReturnValue(null);
});