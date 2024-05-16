import { createFileRoute } from '@tanstack/react-router';

import { SandpackPage } from 'src/pages/SandpackPage';

export const Route = createFileRoute('/sandpack')({
  component: SandpackPage,
});
