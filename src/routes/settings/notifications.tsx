import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/settings/notifications')({
  component: () => <div>notifications</div>,
});
