import { createFileRoute } from '@tanstack/react-router';
import { ServiceConfigPage } from 'src/pages/SettingPage/SeviceConfigPage';

export const Route = createFileRoute('/settings/service-config')({
  component: ServiceConfigPage,
});
