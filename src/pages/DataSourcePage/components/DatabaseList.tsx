import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';

import { nStore } from 'src/utils/store';
import { DB_TYPE_MAP_STORE_KEY } from 'src/constants';
import { Empty } from 'src/components/Empty';
import { DataTableList } from './DataTableList';

export type StoreDBItem = {
  protocol: SupportDBType;
  dbName: string;
  path: string;
  host?: string;
  port?: number;
  user?: string;
  password?: string;
  dataSourceName: string;
};

export const DatabaseList: FC<{
  dbType: SupportDBType;
}> = (props) => {
  const { dbType } = props;
  const [dbList, setDBList] = useState<StoreDBItem[]>([]);

  const queryDBList = async () => {
    if (!dbType) return;

    const dbObj: StoreDBItem[] | null = await nStore.get(
      DB_TYPE_MAP_STORE_KEY[dbType]
    );

    const curList = dbObj ? Object.values(dbObj) : [];

    if (Array.isArray(curList)) {
      setDBList(curList);
    }
  };

  useEffect(() => {
    queryDBList();
  }, []);

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
        {dbList.map((item) => (
          <Tab key={item.dbName} title={item.dataSourceName}>
            <DataTableList dbName={item.dbName} protocol={item.protocol} />
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};
