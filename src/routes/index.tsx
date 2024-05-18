import { createFileRoute, redirect } from '@tanstack/react-router';

import { HomePage } from 'pages/HomePage';
import { LOGIN_EXPIRE_TIME_MS, USER_INFO_KEY } from 'src/constants';
import { nStore } from 'src/utils/store';

export const Route = createFileRoute('/')({
  beforeLoad: async ({ location }) => {
    const user = await nStore.get<StoreUserInfo | null>(USER_INFO_KEY);

    let isAuthenticated = false;

    const date_time = new Date().getTime();

    if (user) {
      const { lastLoginTime } = user;
      const noExpired = lastLoginTime + LOGIN_EXPIRE_TIME_MS <= date_time;

      if (noExpired) {
        isAuthenticated = true;
      }
    }

    if (!isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      });
    }
  },
  component: HomePage,
});
