import { Button } from '@nextui-org/react';
import { useNavigate } from '@tanstack/react-router';
import { useSetAtom } from 'jotai';

import { USER_INFO_KEY } from 'src/constants';
import { userInfoAtom } from 'src/store/userInfoAtom';
import { nStore } from 'src/utils/store';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const setUserInfo = useSetAtom(userInfoAtom, {});

  const handleLogout = async () => {
    await nStore.set(USER_INFO_KEY, null);

    setUserInfo(null);

    navigate({
      to: '/login',
      replace: true,
    });
  };

  return (
    <div>
      <Button variant="ghost" color="primary" onClick={handleLogout}>
        登 出
      </Button>
    </div>
  );
};
