import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/datasource/postgresql')({
  component: () => <div>Hello /datasource/postgresql!</div>,
});
