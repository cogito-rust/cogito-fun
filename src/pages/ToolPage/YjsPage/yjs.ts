import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { IndexeddbPersistence } from 'y-indexeddb';

export const ydoc = new Y.Doc();

// this allows you to instantly get the (cached) documents data
const indexeddbProvider = new IndexeddbPersistence('count-demo', ydoc);

indexeddbProvider.whenSynced.then(() => {
  console.log('loaded data from indexed db');
});

// Sync clients with the y-webrtc provider.
const webrtcProvider = new WebrtcProvider('count-demo', ydoc, {
  signaling: ['ws://175.27.190.215:9009'],
});

// array of numbers which produce a sum
// => "new sum: 1"
