import { createLazyFileRoute } from '@tanstack/react-router';

import { ReactSandpackPage } from 'src/pages/SandpackPage/ReactSandpackPage';

export const Route = createLazyFileRoute('/sandpack/react')({
  component: ReactSandpackPage,
});
