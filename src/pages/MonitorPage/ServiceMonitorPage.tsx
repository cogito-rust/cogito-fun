import { Button, Spacer } from '@nextui-org/react';
import { useState } from 'react';
import { invoke } from '@tauri-apps/api/core';

// query_available_ports
// check_port_available
// query_lan_ip
// query_unix_process_via_port
// query_window_process_via_port

export const ServiceMonitorPage = () => {
  const [startupLoading, setStartupLoading] = useState(false);

  const handleRunAxumServer = async () => {
    try {
      setStartupLoading(true);
      const result = await invoke('run_axum_server', {
        port: 9527,
      });
      console.log(result);
    } catch (e) {
      console.log(e);
    } finally {
      setStartupLoading(false);
    }
  };

  const handleQueryLanIp = async () => {
    try {
      const result = await invoke('query_lan_ip');
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCheckPortAvailable = async () => {
    try {
      const result = await invoke('check_port_available', {
        port: 9527,
      });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  const handleQueryAvailablePorts = async () => {
    try {
      const result = await invoke('query_available_ports', {
        portRange: '9500..9600',
      });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  const handleQueryUnixProcessViaPort = async () => {
    try {
      const result = await invoke('query_unix_process_via_port', {
        port: 9527,
      });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1>ServiceMonitor Page</h1>
      <main>
        <Spacer x={6}>
          <Button
            color="primary"
            onClick={handleRunAxumServer}
            isLoading={startupLoading}
          >
            Run Axum Server
          </Button>

          <Button color="primary" onClick={handleQueryLanIp}>
            handleQueryLanIp
          </Button>

          <Button color="primary" onClick={handleCheckPortAvailable}>
            handleCheckPortAvailable
          </Button>

          <Button color="primary" onClick={handleQueryAvailablePorts}>
            handleQueryAvailablePorts
          </Button>

          <Button color="primary" onClick={handleQueryUnixProcessViaPort}>
            handleQueryUnixProcessViaPort
          </Button>
        </Spacer>
      </main>
    </div>
  );
};
