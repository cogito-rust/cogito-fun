import { createFileRoute } from '@tanstack/react-router';

import { ProfilePage } from 'src/pages/SettingPage/ProfilePage';

export const Route = createFileRoute('/settings/profile')({
  component: ProfilePage,
});
