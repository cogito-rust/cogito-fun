import { createFileRoute } from '@tanstack/react-router';
import { SQLitePage } from 'src/pages/DataSourcePage/SQLitePage';

export const Route = createFileRoute('/datasrouce/sqlite')({
  component: SQLitePage,
});
