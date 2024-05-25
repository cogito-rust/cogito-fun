import { useEffect, useRef, useState } from 'react';

import { genPeer, peerBroadcast } from './peer';
import { DataConnection } from 'peerjs';
import _ from 'lodash';
import { Button, Input } from '@nextui-org/react';

export const PeerReceiverPage = () => {
  const [receiveMsgList, setReceiveMsgList] = useState<string[]>([]);
  const connRef = useRef<DataConnection | null>(null);
  const [msg, setMsg] = useState('');

  const initPeer = () => {
    const pid = _.uniqueId('peer_receiver_');

    const peer = genPeer('chatReceiver');

    peer.on('connection', (conn) => {
      console.log('connection');
      connRef.current = conn;
      conn.on('data', async (data) => {
        // setReceiveMsgList((prev) => [...prev, data]);

        console.log(data);
      });
    });
  };

  const handleSend = () => {
    if (!connRef.current || !msg) return;

    connRef.current.send(msg);

    setMsg('');
  };

  useEffect(() => {
    initPeer();
  }, []);

  return (
    <div>
      <h1>Peer Receiver Page</h1>
      <div>
        <Input onValueChange={setMsg} value={msg} />
        <Button onClick={handleSend}>send</Button>
      </div>
      <div>
        {receiveMsgList.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    </div>
  );
};
