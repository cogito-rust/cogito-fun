import { createLazyFileRoute } from '@tanstack/react-router';

import { DataSourcePage } from 'src/pages/DataSourcePage';

export const Route = createLazyFileRoute('/datasource')({
  component: DataSourcePage,
});
