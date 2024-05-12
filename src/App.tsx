import { Outlet } from '@tanstack/react-router';
import { NextUIProvider } from '@nextui-org/react';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { queryClient } from 'src/utils/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

import { trpc } from 'utils/trpc';

function App() {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3077/trpc',
          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              // authorization: getAuthCookie(),
            };
          },
        }),
      ],
    })
  );

  return (
    <NextUIProvider>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Outlet />
          <Toaster />
        </QueryClientProvider>
      </trpc.Provider>
      <TanStackRouterDevtools />
    </NextUIProvider>
  );
}

export default App;
