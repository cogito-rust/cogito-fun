import { Link, Outlet } from '@tanstack/react-router';

export const RxDBPage = () => {
  return (
    <div>
      <header>
        <nav>
          <Link to="/data-center/rxdb/database">Database</Link>
          <Link to="/data-center/rxdb/collections">Collections</Link>
        </nav>
      </header>
      {/* Add your content here */}
      <Outlet />
    </div>
  );
};
