import { invoke } from '@tauri-apps/api/tauri';
import { appWindow } from '@tauri-apps/api/window';

export interface TauriAPI {
  greet: (name: string) => Promise<string>;
  getAppVersion: () => Promise<string>;
  closeApp: () => Promise<void>;
  minimizeApp: () => Promise<void>;
  maximizeApp: () => Promise<void>;
}

export const tauriAPI: TauriAPI = {
  async greet(name: string): Promise<string> {
    if (!window.__TAURI__) {
      return `Hello, ${name}! (Web fallback)`;
    }
    try {
      return await invoke('greet', { name });
    } catch (error) {
      console.error('Error calling greet:', error);
      return `Hello, ${name}! (Web fallback)`;
    }
  },

  async getAppVersion(): Promise<string> {
    if (!window.__TAURI__) {
      return '0.0.0 (Web)';
    }
    try {
      return await invoke('get_app_version');
    } catch (error) {
      console.error('Error getting app version:', error);
      return '0.0.0 (Web)';
    }
  },

  async closeApp(): Promise<void> {
    if (!window.__TAURI__) {
      console.log('Close app called in web mode - no action taken');
      return;
    }
    try {
      await appWindow.close();
    } catch (error) {
      console.error('Error closing app:', error);
    }
  },

  async minimizeApp(): Promise<void> {
    if (!window.__TAURI__) {
      console.log('Minimize app called in web mode - no action taken');
      return;
    }
    try {
      await appWindow.minimize();
    } catch (error) {
      console.error('Error minimizing app:', error);
    }
  },

  async maximizeApp(): Promise<void> {
    if (!window.__TAURI__) {
      console.log('Maximize app called in web mode - no action taken');
      return;
    }
    try {
      await appWindow.toggleMaximize();
    } catch (error) {
      console.error('Error toggling maximize:', error);
    }
  }
};