import { Divider } from '@nextui-org/react';
import { Link, Outlet } from '@tanstack/react-router';

export const MonitorPage = () => {
  return (
    <div>
      <header>
        <nav className="flex items-center space-x-4">
          <Link to="/monitor/services">服务监控</Link>
          <Divider orientation="vertical" />
          <Link to="/monitor/database">数据库监控</Link>
        </nav>
      </header>
      <Outlet />
    </div>
  );
};
