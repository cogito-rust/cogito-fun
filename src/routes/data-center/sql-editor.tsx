import { createFileRoute } from '@tanstack/react-router';

import { SQLEditorPage } from 'src/pages/DataCenterPage/SQLEditorPage';

export const Route = createFileRoute('/data-center/sql-editor')({
  component: SQLEditorPage,
});
