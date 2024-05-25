import { Button } from '@nextui-org/react';
import { Outlet, useNavigate } from '@tanstack/react-router';

export const PeerPage = () => {
  const navigate = useNavigate();

  const handleOpenReceiverPage = async () => {
    navigate({
      to: '/tools/peer/receiver',
      viewTransition: true,
    });
  };

  const handleOpenSenderPage = async () => {
    navigate({
      to: '/tools/peer/sender',
      viewTransition: true,
    });
  };

  return (
    <div className="flex flex-col w-full">
      <div>
        <Button onClick={handleOpenSenderPage}>open sender page</Button>
        {/* <Spacer x={4} /> */}
        <Button onClick={handleOpenReceiverPage}>open receiver page</Button>
      </div>
      {/* Add your content here */}
      <Outlet />
    </div>
  );
};
