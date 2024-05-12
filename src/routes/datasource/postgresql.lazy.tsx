import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/datasource/postgresql')({
  component: () => <div>Hello /datasource/postgresql!</div>
})