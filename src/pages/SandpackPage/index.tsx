import { Link, Outlet } from '@tanstack/react-router';

export const SandpackPage = () => {
  return (
    <section>
      <header>
        <nav>
          <Link to="/sandpack/react">React</Link>
          <Link to="/sandpack/node">Node</Link>
        </nav>
      </header>
      <Outlet />
    </section>
  );
};
