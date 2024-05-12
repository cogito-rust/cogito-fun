import { Button } from '@nextui-org/react';
import { Link, Outlet } from '@tanstack/react-router';
import { nodeServiceMap } from 'src/configs';

export const SettingPage = () => {
  const handleStopService = async () => {
    await nodeServiceMap.get('service_3077')?.kill();

    console.log('stop service successfully');
  };
  return (
    <section>
      <header>
        <nav>
          <Link to="/settings/system">系统信息</Link>
          <Link to="/settings/service-config">服务配置</Link>
        </nav>
      </header>

      <div>
        <Button color="warning" onClick={handleStopService}>
          Stop
        </Button>
      </div>

      <Outlet />
    </section>
  );
};
