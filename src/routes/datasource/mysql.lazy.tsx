import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/datasource/mysql')({
  component: () => <div>Hello /datasource/mysql!</div>
})