import { createFileRoute } from '@tanstack/react-router';

import { PeerReceiverPage } from 'src/pages/ToolPage/Peer/PeerReceiverPage';

export const Route = createFileRoute('/tools/peer/receiver')({
  component: PeerReceiverPage,
});
