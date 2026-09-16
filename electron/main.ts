import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as http from "http";
import * as fs from "fs";
import * as url from "url";

const BUILD_DIR = path.join(__dirname, "../build");
const PREFERRED_PORT = 31415;

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".webp": "image/webp",
};

function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || "application/octet-stream";
}

function startStaticServer(): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const parsedUrl = url.parse(req.url || "/");
      let filePath = path.join(BUILD_DIR, parsedUrl.pathname || "");

      // Security: prevent directory traversal
      if (!filePath.startsWith(BUILD_DIR)) {
        console.log(`[Server] 403 Forbidden: ${req.url}`);
        res.writeHead(403);
        res.end("Forbidden");
        return;
      }

      fs.stat(filePath, (err, stats) => {
        if (!err && stats.isDirectory()) {
          filePath = path.join(filePath, "index.html");
        }

        fs.readFile(filePath, (err, data) => {
          if (err) {
            // Fallback to index.html for client-side routing
            const indexPath = path.join(BUILD_DIR, "index.html");
            fs.readFile(indexPath, (err2, indexData) => {
              if (err2) {
                console.log(`[Server] 404 Not Found: ${req.url} -> ${filePath}`);
                res.writeHead(404);
                res.end("Not Found");
                return;
              }
              console.log(`[Server] 200 Fallback: ${req.url} -> ${indexPath}`);
              res.writeHead(200, { "Content-Type": "text/html" });
              res.end(indexData);
            });
            return;
          }

          console.log(`[Server] 200 OK: ${req.url} -> ${filePath}`);
          res.writeHead(200, { "Content-Type": getContentType(filePath) });
          res.end(data);
        });
      });
    });

    function tryListen(port: number) {
      server
        .listen(port, "127.0.0.1", () => {
          resolve(port);
        })
        .on("error", (err: NodeJS.ErrnoException) => {
          if (err.code === "EADDRINUSE" && port === PREFERRED_PORT) {
            // Fallback to a random available port
            server.listen(0, "127.0.0.1", () => {
              const address = server.address();
              if (address && typeof address !== "string") {
                resolve(address.port);
              }
            });
          } else {
            reject(err);
          }
        });
    }

    tryListen(PREFERRED_PORT);
  });
}

async function createWindow(port: number) {
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
    title: "ScalesViewer",
    show: false,
  });

  mainWindow.webContents.on("console-message", (_event, level, message, line, sourceId) => {
    const levelName = ["verbose", "info", "warning", "error"][level] || "log";
    console.log(`[Renderer ${levelName}] ${message}${sourceId ? ` (${sourceId}:${line})` : ""}`);
  });

  await mainWindow.loadURL(`http://127.0.0.1:${port}/`);

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(async () => {
  const port = await startStaticServer();
  await createWindow(port);

  app.on("activate", async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow(port);
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
