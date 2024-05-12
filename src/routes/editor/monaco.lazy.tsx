import { createLazyFileRoute } from '@tanstack/react-router';
import { EditorPage } from 'src/pages/EditorPage';

export const Route = createLazyFileRoute('/editor/monaco')({
  component: EditorPage,
});
