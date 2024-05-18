import {
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Divider,
} from '@nextui-org/react';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import logoSvg from 'src/assets/logo.svg';
import { appInit } from 'src/utils/app-initialize';
import { nStore } from 'src/utils/store';
import { INIT_STORE_SUCCESS, SYS_SQLITE_TABLES } from 'src/constants';
import { error } from '@tauri-apps/plugin-log';
import { sysSqliteDB } from 'src/utils/cogito-sql-actor/system-sqlite-db';
import { notify } from 'src/utils/toaster';

export function LoginPage() {
  const [initAppLoading, setInitAppLoading] = useState(false);
  const [account, setAccount] = useState('');
  const [pwd, setPwd] = useState('');

  const handleAppInitOnce = async () => {
    await nStore.set(INIT_STORE_SUCCESS, true);
    const isFinishedInit = await nStore.get(INIT_STORE_SUCCESS);

    if (isFinishedInit) return;

    try {
      setInitAppLoading(true);
      const res = await appInit();
      if (res) {
        await nStore.set(INIT_STORE_SUCCESS, true);
      }
    } catch (e: any) {
      error(e);
    } finally {
      setInitAppLoading(false);
    }
  };

  const validLoginValue = useMemo(() => {
    if (!!account.trim() && pwd.trim().length >= 6) return true;

    return false;
  }, [account, pwd]);

  useEffect(() => {
    handleAppInitOnce();
  }, []);

  const handleLogin = async () => {
    console.log(account, pwd);
    const result = await sysSqliteDB.select(SYS_SQLITE_TABLES.user, {
      username: account,
    });

    const user = result?.[0] as Omit<StoreUserInfo, 'lastLoginTime'>;

    if (!user) {
      notify('用户不存在');

      return;
    }
    const { password } = user;

    if (password !== pwd) {
      notify('密码错误');

      return;
    }

    console.log(result);
  };

  const isAccountInvalid = useMemo(() => {
    if (account.trim() === '') return true;

    return false;
  }, [account]);

  const isPwdInvalid = useMemo(() => {
    if (pwd.trim().length < 6) return true;

    return false;
  }, [pwd]);

  return (
    <LoginContainer>
      <Card className="max-w-full w-[340px] h-[400px]">
        <CardHeader className="flex gap-3">
          <Image
            alt="cogito logo"
            height={40}
            radius="sm"
            src={logoSvg}
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">Cogito</p>
            <p className="text-small text-default-500">JUST FOR FUN</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="overflow-hidden">
          <form className="flex flex-col gap-4">
            <Input
              isRequired
              label="账号"
              autoComplete="off"
              placeholder="输入个人账号"
              isClearable
              color={isAccountInvalid ? 'danger' : 'success'}
              errorMessage={isAccountInvalid && '账号不能为空'}
              onValueChange={setAccount}
            />
            <Input
              isRequired
              label="Password"
              value={pwd}
              onValueChange={setPwd}
              placeholder="输入用户密码"
              type="password"
              color={isPwdInvalid ? 'danger' : 'success'}
              errorMessage={isPwdInvalid && '登录密码不能少于6个字符'}
              isClearable
            />
            <Button
              fullWidth
              color="primary"
              onClick={handleLogin}
              isLoading={initAppLoading}
              isDisabled={!validLoginValue}
            >
              {initAppLoading ? '应用首次启动初始化...' : '登 录'}
            </Button>
          </form>
        </CardBody>
      </Card>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-image: linear-gradient(
    174.2deg,
    rgba(255, 244, 228, 1) 7.1%,
    rgba(240, 246, 238, 1) 67.4%
  );
`;
