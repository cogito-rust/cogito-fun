import { Outlet } from '@tanstack/react-router';
import { Button, NextUIProvider } from '@nextui-org/react';
import { queryClient } from 'src/utils/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import { trpc } from 'utils/trpc';

function App() {
  const [darkMode, setDarkMode] = useState(false);
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

  useEffect(() => {
    // initial

    return () => {
      // cleanup
    };
  }, []);

  return (
    <NextUIProvider>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <main
            className={`${
              darkMode ? 'dark' : ''
            } text-foreground bg-background`}
          >
            <Outlet />
          </main>
          <Toaster />
        </QueryClientProvider>
      </trpc.Provider>
    </NextUIProvider>
  );
}

export default App;
