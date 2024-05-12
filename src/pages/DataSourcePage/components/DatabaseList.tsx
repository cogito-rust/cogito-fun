import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';

import { nStore } from 'src/utils/store';
import { DB_TYPE_MAP_STORE_KEY } from 'src/constants';
import { Empty } from 'src/components/Empty';

export type SupportDBType = 'sqlite' | 'mysql' | 'postgres';

export type StoreDBItem = {
  type: SupportDBType;
  dbName: string;
  path: string;
  host?: string;
  port?: number;
  user?: string;
  password?: string;
};

export type DBType = 'sqlite' | 'mysql' | 'postgresql';

export const DatabaseList: FC<{
  dbType: DBType;
}> = (props) => {
  const { dbType } = props;
  const [dbList, setDBList] = useState<StoreDBItem[]>([]);

  const queryDBList = async () => {
    const curList: StoreDBItem[] | null = await nStore.get(
      DB_TYPE_MAP_STORE_KEY[dbType]
    );

    if (Array.isArray(curList)) {
      setDBList(curList);
    }
  };

  useEffect(() => {
    queryDBList();
  }, [dbType]);

  if (dbList.length === 0) {
    return (
      <div className="mt-16">
        <Empty />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options" isVertical>
        <Tab key="photos" title="Photos">
          <Card>
            <CardBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </CardBody>
          </Card>
        </Tab>
        <Tab key="music" title="Music">
          <Card>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </CardBody>
          </Card>
        </Tab>
        <Tab key="videos" title="Videos">
          <Card>
            <CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};
