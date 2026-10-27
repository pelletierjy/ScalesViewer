import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.jeanyves.scalesviewer",
  appName: "ScalesViewer",
  webDir: "build",
  server: {
    androidScheme: "https",
  },
};

export default config;