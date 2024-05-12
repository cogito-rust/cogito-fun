import { createLazyFileRoute } from '@tanstack/react-router';

import { RxDatabasePage } from 'src/pages/DataCenterPage/RxDBPage/databases';

export const Route = createLazyFileRoute('/data-center/rxdb/database')({
  component: RxDatabasePage,
});
