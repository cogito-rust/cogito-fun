import { createLazyFileRoute } from '@tanstack/react-router';

import { RxCollectionPage } from 'src/pages/DataCenterPage/RxDBPage/collections';

export const Route = createLazyFileRoute('/data-center/rxdb/collections')({
  component: RxCollectionPage,
});
