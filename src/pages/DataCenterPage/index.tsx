import { Link, Outlet } from '@tanstack/react-router';

export const DataCenterPage = () => {
  return (
    <div>
      <header>
        <nav>
          <Link to="/data-center/rxdb">RxDB</Link>
        </nav>
      </header>
      {/* 添加其他数据中心的组件 */}
      <Outlet />
    </div>
  );
};
