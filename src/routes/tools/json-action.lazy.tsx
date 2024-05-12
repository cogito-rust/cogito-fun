import { createLazyFileRoute } from '@tanstack/react-router';
import { JsonActionPage } from 'src/pages/ToolPage/JsonActionPage';

export const Route = createLazyFileRoute('/tools/json-action')({
  component: JsonActionPage,
});
