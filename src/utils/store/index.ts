import { Store } from '@tauri-apps/plugin-store';

// Store will be loaded automatically when used in JavaScript binding.
export const nStore = new Store('store.bin');
