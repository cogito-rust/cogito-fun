import { BreadcrumbsCogito } from 'src/components/BreadcrumbsCogito';
import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Chip, Button } from '@nextui-org/react';
import { VscAdd } from 'react-icons/vsc';

import { DatabaseList } from './components/DatabaseList';

export const DataSourcePage = () => {
  const [activeDBType, setActiveDBType] = useState<React.Key>('sqlite');

  return (
    <section className="w-screen h-screen overflow-hidden">
      <BreadcrumbsCogito />
      <header className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-700">数据源管理</h2>
      </header>
      <div className="flex w-full flex-col mt-4 px-3 relative">
        <Tabs
          aria-label="Options"
          color="primary"
          variant="underlined"
          classNames={{
            tabList:
              'gap-6 w-full  relative rounded-none p-0 border-b border-divider',
            cursor: 'w-full',
            tab: 'max-w-fit px-2 h-12',
            // tabContent: 'group-data-[selected=true]:text-[#06b6d4]',
          }}
          onSelectionChange={setActiveDBType}
        >
          <Tab
            key="sqlite"
            title={
              <div className="flex items-center space-x-2">
                {/* <GalleryIcon/> */}
                <span>SQLite</span>
                <Chip size="sm" variant="faded">
                  9
                </Chip>
              </div>
            }
          >
            <DatabaseList dbType={activeDBType as 'sqlite'} />
          </Tab>
          <Tab
            key="mysql"
            title={
              <div className="flex items-center space-x-2">
                {/* <MusicIcon/> */}
                <span>MySQL</span>
                <Chip size="sm" variant="faded">
                  3
                </Chip>
              </div>
            }
          >
            <DatabaseList dbType={activeDBType as 'mysql'} />
          </Tab>
          <Tab
            key="postgresql"
            title={
              <div className="flex items-center space-x-2">
                {/* <VideoIcon/> */}
                <span>PostgreSQL</span>
                <Chip size="sm" variant="faded">
                  1
                </Chip>
              </div>
            }
          >
            <DatabaseList dbType={activeDBType as 'postgresql'} />
          </Tab>
        </Tabs>
        <div className="absolute top-2 right-3">
          <Button
            color="primary"
            size="sm"
            // variant="bordered"
            startContent={<VscAdd />}
          >
            创建数据源
          </Button>
        </div>
      </div>
    </section>
  );
};
