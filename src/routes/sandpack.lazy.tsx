import { createLazyFileRoute } from '@tanstack/react-router';

import { SandpackPage } from 'src/pages/SandpackPage';

export const Route = createLazyFileRoute('/sandpack')({
  component: SandpackPage,
});
