# Instrument audio samples

Static one-shot samples for instrument-aware playback (see `specs/instrument-audio/spec.md`).

## Files

| File | Root note | Used for |
|------|-----------|----------|
| `guitar.wav` | E3 | Guitar page |
| `piano.wav` | C4 | Piano page |
| `kalimba.wav` | C4 | Kalimba page |
| `harmonica.wav` | C4 | Harmonica page |

## Regenerating

Project-generated placeholder tones (not commercial recordings):

```bash
node scripts/generate-sound-samples.mjs
```

Replace with CC0 one-shots from [Freesound](https://freesound.org) (CC0 filter) when higher fidelity is needed; update this README with source URLs and licenses.
