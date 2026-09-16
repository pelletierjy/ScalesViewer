import { contextBridge } from "electron";

// Preload script for ScalesViewer
// Use contextBridge.exposeInMainWorld() to securely expose native APIs
// to the renderer process when needed.

// Example:
// contextBridge.exposeInMainWorld('electronAPI', {
//   platform: process.platform,
// });
