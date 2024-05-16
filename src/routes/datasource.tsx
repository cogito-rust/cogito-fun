import { createFileRoute } from '@tanstack/react-router';

import { DataSourcePage } from 'src/pages/DataSourcePage';

export const Route = createFileRoute('/datasource')({
  component: DataSourcePage,
});
