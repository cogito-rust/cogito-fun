import { createFileRoute } from '@tanstack/react-router';
import { DatabaseMonitorPage } from 'src/pages/MonitorPage/DatabaseMonitorPage';

export const Route = createFileRoute('/monitor/database')({
  component: DatabaseMonitorPage,
});
