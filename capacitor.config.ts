import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.corpovalle.app',
  appName: 'PIF',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      launchFadeOutDuration: 1000,
      androidScaleType: "CENTER",
    },
  },
  android: {
      buildOptions: {
        keystorePath: 'dataquest-keystore.jks',
        keystoreAlias: 'dataquest',
        releaseType: 'AAB'
      }
  }
  };

export default config;
