import { useEffect, useRef, useState } from 'react';
import Peer, { DataConnection } from 'peerjs';

import { useSearch } from '@tanstack/react-router';
import { Button, Input } from '@nextui-org/react';
import { genPeer } from './peer';
import _ from 'lodash';

export const PeerSenderPage = () => {
  const [msg, setMsg] = useState('');
  const connRef = useRef<DataConnection | null>(null);
  const peerRef = useRef<Peer | null>(null);

  const queries = useSearch({
    strict: false,
  }) as {
    pid: string;
  };

  const handleSendMsg = () => {
    console.log('send ->: ');
    if (!connRef.current) return;

    // connRef.current.on('open', () => {
    // });
    const msg = {
      msgName: 'beginSendFile',
      fileName: '',
      sendTime: Date.now(),
    };

    connRef.current!.send(JSON.stringify(msg));

    setMsg('');
  };

  const initPeer = () => {
    const pid = _.uniqueId('peer_sender_');

    const peerClient = genPeer(pid);
    peerRef.current = peerClient;
    const conn = peerClient.connect('chatReceiver');

    connRef.current = conn;

    conn.on('open', () => {
      console.log('sender conn open');
      const msg = {
        msgName: 'beginSendFile',
        fileName: '',
        sendTime: Date.now(),
      };

      conn.send(JSON.stringify(msg));

      conn.on('data', (data) => {
        console.log('sender: ', data);
      });
    });
  };

  useEffect(() => {
    initPeer();
  }, []);

  return (
    <div>
      <h1>Peer Sender Page</h1>
      <div>
        <Input onValueChange={setMsg} value={msg} />

        <Button onClick={handleSendMsg}>send</Button>
      </div>
    </div>
  );
};
