import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/editor/novel')({
  component: () => <div>Hello /editor/novel!</div>
})