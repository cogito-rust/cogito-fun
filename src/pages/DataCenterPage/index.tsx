import { Link, Outlet } from '@tanstack/react-router';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';

export const DataCenterPage = () => {
  return (
    <section className="w-full min-h-screen">
      <header>
        <Navbar>
          <NavbarBrand>
            {/* <AcmeLogo /> */}
            <p className="font-bold text-inherit">COGITO</p>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              <Link color="foreground" to="/data-center/sql-editor">
                SQL Editor
              </Link>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </header>
      {/* Add your content here */}
      <Outlet />
    </section>
  );
};
