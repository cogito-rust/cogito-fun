import { createFileRoute } from '@tanstack/react-router';

import { NodeSandpackPage } from 'src/pages/SandpackPage/NodeSandpackPage';

export const Route = createFileRoute('/sandpack/node')({
  component: NodeSandpackPage,
});
