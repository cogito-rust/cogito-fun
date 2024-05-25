import { createFileRoute } from '@tanstack/react-router';

import { PeerPage } from 'src/pages/ToolPage/Peer';

export const Route = createFileRoute('/tools/peer')({
  component: PeerPage,
});
