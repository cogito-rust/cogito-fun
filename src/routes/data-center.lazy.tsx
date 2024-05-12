import { createLazyFileRoute } from '@tanstack/react-router';
import { DataCenterPage } from 'src/pages/DataCenterPage';

export const Route = createLazyFileRoute('/data-center')({
  component: DataCenterPage,
});
