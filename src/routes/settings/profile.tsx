import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/settings/profile')({
  component: () => <div>profile</div>,
});
