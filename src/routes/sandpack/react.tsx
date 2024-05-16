import { createFileRoute } from '@tanstack/react-router';

import { ReactSandpackPage } from 'src/pages/SandpackPage/ReactSandpackPage';

export const Route = createFileRoute('/sandpack/react')({
  component: ReactSandpackPage,
});
