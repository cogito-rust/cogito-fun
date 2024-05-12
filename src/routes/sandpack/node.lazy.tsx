import { createLazyFileRoute } from '@tanstack/react-router';

import { NodeSandpackPage } from 'src/pages/SandpackPage/NodeSandpackPage';

export const Route = createLazyFileRoute('/sandpack/node')({
  component: NodeSandpackPage,
});
