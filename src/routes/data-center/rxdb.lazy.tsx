import { createLazyFileRoute } from '@tanstack/react-router';

import { RxDBPage } from 'src/pages/DataCenterPage/RxDBPage';

export const Route = createLazyFileRoute('/data-center/rxdb')({
  component: RxDBPage,
});
