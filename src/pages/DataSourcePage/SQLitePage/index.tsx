import { Button, Tab, Tabs } from '@nextui-org/react';
import { useSearch } from '@tanstack/react-router';
import { BreadcrumbsCogito } from 'src/components/BreadcrumbsCogito';
import { TablePreview } from './TablePreview';

export const SQLitePage = () => {
  const { protocol, tableName } = useSearch({
    strict: false,
  }) as { protocol: SupportDBType; tableName: string };

  return (
    <section className="w-screen h-screen overflow-hidden">
      <BreadcrumbsCogito />
      <header className="flex justify-end px-3">
        <Button color="primary" size="sm">
          分 享
        </Button>
      </header>
      <main className="px-3 mt-8">
        <Tabs color="primary" radius="full" size="sm" variant="solid">
          <Tab key="preview" title="表预览">
            <TablePreview protocol={protocol} tableName={tableName} />
          </Tab>
          <Tab key="tables" title="所有表" />
          <Tab key="database" title="数据库" />
        </Tabs>
      </main>
    </section>
  );
};
