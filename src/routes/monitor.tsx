import { createFileRoute } from '@tanstack/react-router';

import { MonitorPage } from 'src/pages/MonitorPage';

export const Route = createFileRoute('/monitor')({
  component: MonitorPage,
});
