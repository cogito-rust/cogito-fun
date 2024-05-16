import { createFileRoute } from '@tanstack/react-router';

import { ServiceMonitorPage } from 'src/pages/MonitorPage/ServiceMonitorPage';

export const Route = createFileRoute('/monitor/services')({
  component: ServiceMonitorPage,
});
