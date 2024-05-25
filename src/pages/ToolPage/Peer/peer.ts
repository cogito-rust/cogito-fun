import { Peer } from 'peerjs';

export const genPeer = (pid: string) =>
  new Peer(pid, {
    host: '175.27.190.215',
    port: 7007,
    path: '/',
    debug: 3,
  });

export const peerBroadcast = new BroadcastChannel('peer-broadcast');
