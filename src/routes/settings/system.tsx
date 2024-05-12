import { createFileRoute } from '@tanstack/react-router';
import { SystemInfoPage } from 'src/pages/SettingPage/SystemInfoPage';

export const Route = createFileRoute('/settings/system')({
  component: SystemInfoPage,
});
