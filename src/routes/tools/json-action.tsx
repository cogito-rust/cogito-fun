import { createFileRoute } from '@tanstack/react-router';
import { JsonActionPage } from 'src/pages/ToolPage/JsonActionPage';

export const Route = createFileRoute('/tools/json-action')({
  component: JsonActionPage,
});
