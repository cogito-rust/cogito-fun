import { createFileRoute } from '@tanstack/react-router';

import { SettingPage } from 'src/pages/SettingPage';

export const Route = createFileRoute('/settings')({
  component: SettingPage,
});
