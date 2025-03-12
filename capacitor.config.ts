import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.gscale.app",
  appName: "Scale Viewer",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
  android: {
    buildOptions: {
      keystorePath: "release-key.keystore",
      keystoreAlias: "key0",
    },
  },
};

export default config;
