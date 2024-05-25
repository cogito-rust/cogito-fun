import { createFileRoute } from '@tanstack/react-router';
import { DataFormViewPage } from 'src/components/DataForm';

export const Route = createFileRoute('/window/dataformview')({
  component: DataFormViewPage,
});
