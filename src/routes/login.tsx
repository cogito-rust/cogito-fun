import { createFileRoute } from '@tanstack/react-router';
import { LoginRegisterPage } from 'src/pages/LoginRegisterPage';

export const Route = createFileRoute('/login')({
  component: LoginRegisterPage,
});
