import { createLazyFileRoute } from '@tanstack/react-router';
import { LoginRegisterPage } from 'src/pages/LoginRegisterPage';

export const Route = createLazyFileRoute('/login-register')({
  component: LoginRegisterPage,
});
