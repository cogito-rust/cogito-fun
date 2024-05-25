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
import { error } from '@tauri-apps/plugin-log';
import { redirect, useNavigate } from '@tanstack/react-router';
import { useSetAtom } from 'jotai';
import _ from 'lodash';

import logoSvg from 'src/assets/logo.svg';
import { appInit } from 'src/utils/app-initialize';
import { nStore } from 'src/utils/store';
import {
  INIT_STORE_SUCCESS,
  SYS_SQLITE_TABLES,
  USER_INFO_KEY,
} from 'src/constants';
import { sysSqliteDB } from 'src/utils/cogito-sql-actor/system-sqlite-db';
import { notify, successToast } from 'src/utils/toaster';
import { userInfoAtom } from 'src/store/userInfoAtom';

export function LoginPage() {
  const setUserInfo = useSetAtom(userInfoAtom, {});
  const [initAppLoading, setInitAppLoading] = useState(false);
  const [account, setAccount] = useState<string | undefined>(undefined);
  const [pwd, setPwd] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const handleAppInitOnce = async () => {
    // await nStore.set(INIT_STORE_SUCCESS, true);
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
    if (account === undefined || pwd === undefined) return false;

    if (!!account.trim() && pwd.trim().length >= 6) return true;

    return false;
  }, [account, pwd]);

  useEffect(() => {
    handleAppInitOnce();
  }, []);

  const handleLogin = async () => {
    const result = await sysSqliteDB.select(SYS_SQLITE_TABLES.user, {
      username: account,
    });

    const user = result?.[0] as Omit<StoreUserInfo, 'lastLoginTime'>;

    if (!user) {
      notify('用户不存在');

      return;
    }
    const { password, username } = user;

    if (username !== account) {
      notify('用户名不正确');

      return;
    }

    if (password !== pwd) {
      notify('输入密码不正确');

      return;
    }

    const { id } = user;

    const roleRes =
      (await sysSqliteDB.select(SYS_SQLITE_TABLES.user_roles, {
        user_id: id,
      })) || [];

    // if (!roleRes?.length) return;

    let roleList: any[] = [];
    let rolePermissionsList: any[] = [];
    let permissionsList: any[] = [];

    for (const item of roleRes) {
      const { role_id } = item;

      roleList =
        (await sysSqliteDB.select(SYS_SQLITE_TABLES.roles, {
          id: role_id,
        })) || [];

      rolePermissionsList =
        (await sysSqliteDB.select(SYS_SQLITE_TABLES.role_permissions, {
          role_id,
        })) || [];
    }

    for (const item of rolePermissionsList) {
      const { permission_id } = item;

      const myPermissions =
        (await sysSqliteDB.select(SYS_SQLITE_TABLES.permissions, {
          id: permission_id,
        })) || [];

      permissionsList = [...permissionsList, ...myPermissions];
    }

    // console.log('permissionsList', permissionsList);

    const foramtRoles = _.map(roleList, 'name');
    const foramtPermissions = _.map(permissionsList, 'code');
    const retUser: StoreUserInfo = {
      ...user,
      roles: foramtRoles,
      permissions: foramtPermissions,
      lastLoginTime: new Date().getTime(),
    };

    setUserInfo(retUser);
    successToast('登录成功');
    await nStore.set(USER_INFO_KEY, retUser);
    navigate({
      to: '/',
      replace: true,
    });
  };

  const isAccountInvalid = useMemo(() => {
    if (account === undefined) return 'default';

    if (account.trim() === '') return 'danger';

    return 'success';
  }, [account]);

  const isPwdInvalid = useMemo(() => {
    if (pwd === undefined) return 'default';

    if (pwd.trim().length < 6) return 'danger';

    return 'success';
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
              autoCapitalize="off"
              placeholder="输入个人账号"
              // isClearable
              color={isAccountInvalid}
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
              autoComplete="off"
              autoCapitalize="off"
              color={isPwdInvalid}
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
