import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/datasource/sqlite')({
  component: () => <div>Hello /datasource/sqlite!</div>
})