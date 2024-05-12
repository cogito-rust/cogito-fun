import WebSocket from '@tauri-apps/plugin-websocket';
import { internalIpV4 } from 'internal-ip';

export let ws: WebSocket | null = null;

export const establishWS = async (port = 12306) => {
  const ip = await internalIpV4();

  if (ws) return;

  ws = await WebSocket.connect(`ws://${ip}:${port}`);
};

export const closeWS = async () => {
  if (ws) {
    await ws.disconnect();
    ws = null;
  }
};
