import {
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Divider,
} from '@nextui-org/react';
import { useEffect } from 'react';
import styled from 'styled-components';

import logoSvg from 'src/assets/logo.svg';
import { appInit } from 'src/utils/app-initialize';

export function LoginRegisterPage() {
  useEffect(() => {
    // appInit();
  }, []);

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
            <Input isRequired label="账号" placeholder="输入个人账号" />
            <Input
              isRequired
              label="Password"
              placeholder="输入用户密码"
              type="password"
            />
            <div className="flex gap-2 justify-end">
              <Button fullWidth color="primary">
                登 录
              </Button>
            </div>
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
