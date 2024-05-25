import { createFileRoute } from '@tanstack/react-router';
import { JsonActionEditorPage } from 'src/pages/ToolPage/JsonActionPage/JsonEditor';

export const Route = createFileRoute('/window/jsonactioneditor')({
  component: JsonActionEditorPage,
});
