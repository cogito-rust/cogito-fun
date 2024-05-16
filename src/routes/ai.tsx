import { createFileRoute } from '@tanstack/react-router';
import { AIPage } from 'src/pages/AIPage';

export const Route = createFileRoute('/ai')({
  component: AIPage,
});
