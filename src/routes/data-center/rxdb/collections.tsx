import { createFileRoute } from '@tanstack/react-router';

import { RxCollectionPage } from 'src/pages/DataCenterPage/RxDBPage/collections';

export const Route = createFileRoute('/data-center/rxdb/collections')({
  component: RxCollectionPage,
});
