import { createFileRoute } from '@tanstack/react-router';

import { RxDBPage } from 'src/pages/DataCenterPage/RxDBPage';

export const Route = createFileRoute('/data-center/rxdb')({
  component: RxDBPage,
});
