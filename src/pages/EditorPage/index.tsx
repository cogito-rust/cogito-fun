import { Outlet, Link } from '@tanstack/react-router';
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Spacer,
  Button,
  Input,
} from '@nextui-org/react';
import { MonacoEditorFeature } from 'src/features/MonacoEditor';
import { listen, TauriEvent } from '@tauri-apps/api/event';
import { Command } from '@tauri-apps/plugin-shell';
import { useState } from 'react';
import { trpc } from 'src/utils/trpc';
import { nodeServiceMap } from 'src/configs';

export const EditorPage = () => {
  const [name, setName] = useState('');

  // const { mutate } = trpc.useMutation(['greet']);
  const userQuery = trpc.createUser.useMutation();

  const handleStartService = async () => {
    /**
     * Running NodeJS process as a sidecar
     */
    const cmd = Command.sidecar('binaries/node');

    cmd.spawn().then((child) => {
      /**
       * Killing server process when window is closed. Probably won't
       * work for multi window application
       */

      nodeServiceMap.set('service_3077', child);
      listen(TauriEvent.WINDOW_DESTROYED, function () {
        child.kill();
      });
    });

    cmd.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
  };

  const handleQuery = () => {
    if (!name) return;

    userQuery.mutate(
      { name },
      {
        onSuccess: (data) => {
          console.log('success', data);
        },
      }
    );
  };

  return (
    <section className="flex w-full h-full flex-col">
      {/* <Tabs aria-label="Options">
        <Tab key="Monaco" title="Monaco">
          <Card>
            <MonacoEditorFeature />
          </Card>
        </Tab>
        <Tab key="Novel" title="Novel">
          <Card>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </CardBody>
          </Card>
        </Tab>
      </Tabs> */}
      <header>
        <nav>
          <Link to="/editor/monaco">Monaco</Link>
          <Link to="/editor/novel">Novel</Link>
        </nav>
      </header>
      <div>
        <Button color="primary" onClick={handleStartService}>
          启动服务
        </Button>
      </div>
      <div>
        <Input onValueChange={setName} />
        <Button color="primary" onClick={handleQuery}>
          查询
        </Button>
        {userQuery.data && <div>{userQuery.data.name}</div>}
      </div>
      <Outlet />
    </section>
  );
};
