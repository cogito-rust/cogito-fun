import { createFileRoute } from '@tanstack/react-router';

import { RxDatabasePage } from 'src/pages/DataCenterPage/RxDBPage/databases';

export const Route = createFileRoute('/data-center/rxdb/database')({
  component: RxDatabasePage,
});
