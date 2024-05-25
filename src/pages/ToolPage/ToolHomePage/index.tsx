import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from '@nextui-org/react';

import { GalleryIcon } from 'src/components/icons/GalleryIcon';

export const ToolHomePage = () => {
  return (
    <div className="flex flex-wrap p-4">
      <Card className="max-w-[260px]">
        <CardHeader className="flex gap-3">
          <GalleryIcon />
          <div className="flex flex-col">
            <p className="text-md">NextUI</p>
            <p className="text-small text-default-500">nextui.org</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>Make beautiful websites regardless of your design experience.</p>
        </CardBody>
        <Divider />
        <CardFooter>
          <Link
            isExternal
            showAnchorIcon
            href="https://github.com/nextui-org/nextui"
          >
            立即查看
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};
