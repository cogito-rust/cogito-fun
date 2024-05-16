import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';
import { Empty } from 'src/components/Empty';
import { sysSqliteDB } from 'src/utils/cogito-sql-actor/system-sqlite-db';

export const DataTableList: FC<{
  dbName: string;
  protocol: SupportDBType;
}> = (props) => {
  const { dbName, protocol } = props;
  const [tables, setTables] = useState<SqliteTableItem[]>([]);

  const handleQueryTablesViaDBName = async () => {
    if (dbName === 'cogito_fun_sys') {
      const curTables = await sysSqliteDB.queryTables();

      setTables(curTables);
    }
  };

  useEffect(() => {
    handleQueryTablesViaDBName();
  }, [dbName]);

  if (!tables.length) {
    return <Empty />;
  }

  return (
    <div className="w-full h-full flex gap-3 flex-wrap">
      {tables.map((item, index) => {
        return (
          <Card key={index}>
            <CardHeader className="flex gap-3">
              <p className="text-small text-default-500">
                表名: <span className="font-bold">{item.name}</span>
              </p>
            </CardHeader>
            <Divider />
            <CardBody>
              <p className="text-sm text-slate-500">系统表，请谨慎操作</p>
            </CardBody>
            <CardFooter>
              <ButtonGroup size="sm" fullWidth variant="light">
                <Button color="primary">查看</Button>
                <Button color="default">部署</Button>
                <Button color="danger">删除</Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
