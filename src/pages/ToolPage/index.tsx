import { Link, Outlet } from '@tanstack/react-router';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';

import styled from 'styled-components';

const MainContainer = styled.main`
  flex: 1;
  background-image: linear-gradient(to bottom, #fffeff 0%, #e2d1c3 100%);
`;

export const ToolPage = () => {
  return (
    <section className="flex flex-col w-full min-h-screen">
      <Navbar height="3rem">
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <Link to="/">
            <p className="font-bold text-inherit">COGITO</p>
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" to="/tools">
              全部应用
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" to="/tools/json-action">
              JSONACTION
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link aria-current="page" to="/tools/peer">
              Peer
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link aria-current="page" to="/tools/yjs">
              YJS
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <MainContainer>
        <Outlet />
      </MainContainer>
    </section>
  );
};
