import { createFileRoute } from '@tanstack/react-router';
import { ToolPage } from 'src/pages/ToolPage';

export const Route = createFileRoute('/tools')({
  component: ToolPage,
});
