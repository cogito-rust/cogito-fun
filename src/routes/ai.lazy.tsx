import { createLazyFileRoute } from '@tanstack/react-router';
import { AIPage } from 'src/pages/AIPage';

export const Route = createLazyFileRoute('/ai')({
  component: AIPage,
});
