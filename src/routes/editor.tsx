import { createFileRoute } from '@tanstack/react-router';
import { EditorPage } from 'src/pages/EditorPage';

export const Route = createFileRoute('/editor')({
  component: EditorPage,
  notFoundComponent: () => {
    return <p>Post not found!</p>;
  },
});
