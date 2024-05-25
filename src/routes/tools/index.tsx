import { createFileRoute } from '@tanstack/react-router';
import { ToolHomePage } from 'src/pages/ToolPage/ToolHomePage';

export const Route = createFileRoute('/tools/')({
  component: ToolHomePage,
});
