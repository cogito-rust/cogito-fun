import { createFileRoute } from '@tanstack/react-router';
import { DataCenterPage } from 'src/pages/DataCenterPage';

export const Route = createFileRoute('/data-center')({
  component: DataCenterPage,
});
