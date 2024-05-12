import { Button, Card, CardBody } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { closeWS, establishWS, ws } from 'src/utils/ws';

export const ServiceConfigPage = () => {
  const [wsStatus, setStatus] = useState(false);
  const [wsMsgList, setMsgList] = useState<any[]>([]);
  const handleWSConnect = async () => {
    await establishWS();
    setStatus(true);
  };

  const handleWSDisconnect = async () => {
    await closeWS();
    setStatus(false);
  };

  useEffect(() => {
    if (ws) {
      ws.addListener((msg) => {
        setMsgList((prev) => [...prev, msg]);
      });
    }
  }, [wsStatus]);
  return (
    <div>
      <Card>
        <CardBody>
          <p>ws id: {ws?.id}</p>
          <Button color="primary" onClick={handleWSConnect}>
            connect ws
          </Button>
          <Button onClick={handleWSDisconnect}>disconnect ws</Button>
          <ul>
            {wsMsgList.map((msg) => (
              <li>{msg}</li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
};
