import type { AppConfig } from 'app-config';

export const validateConfig = (config: AppConfig) => {
  if (!config.appName) {
    throw new Error('Missing appName in appConfig');
  }
  if (!config.appDescription) {
    throw new Error('Missing appDescription in appConfig');
  }
  if (config.appLinks) {
    if (!Array.isArray(config.appLinks)) {
      throw new Error('appLinks in appConfig must be an array');
    }
    config.appLinks.forEach((link) => {
      if (!link.label) {
        throw new Error('Missing label in appLink in appConfig');
      }
      if (!link.href) {
        throw new Error('Missing href in appLink in appConfig');
      }
    });
  }
};

export default validateConfig;
