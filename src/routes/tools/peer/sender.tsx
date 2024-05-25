import { createFileRoute } from '@tanstack/react-router';

import { PeerSenderPage } from 'src/pages/ToolPage/Peer/PeerSenderPage';

export const Route = createFileRoute('/tools/peer/sender')({
  component: PeerSenderPage,
});
