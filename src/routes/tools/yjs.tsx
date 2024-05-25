import { createFileRoute } from '@tanstack/react-router';

import { YjsPage } from 'src/pages/ToolPage/YjsPage';

export const Route = createFileRoute('/tools/yjs')({
  component: YjsPage,
});
