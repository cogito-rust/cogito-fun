import { createFileRoute } from '@tanstack/react-router';
import { EditorPage } from 'src/pages/EditorPage';

export const Route = createFileRoute('/editor/monaco')({
  component: EditorPage,
});
