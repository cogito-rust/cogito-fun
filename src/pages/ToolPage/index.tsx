import { Link, Outlet } from '@tanstack/react-router';

export const ToolPage = () => {
  return (
    <div>
      <header>
        <nav>
          <Link to="/tools/json-action">JsonAction</Link>
        </nav>
      </header>
      {/* Add your content here */}
      <Outlet />
    </div>
  );
};
