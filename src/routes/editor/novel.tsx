import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/editor/novel')({
  component: () => <div>Hello /editor/novel!</div>,
});
