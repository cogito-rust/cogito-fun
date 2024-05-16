import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/datasource/mysql')({
  component: () => <div>Hello /datasource/mysql!</div>,
});
