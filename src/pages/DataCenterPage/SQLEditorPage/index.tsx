import {
  Button,
  Select,
  SelectItem,
  Spacer,
  Textarea,
} from '@nextui-org/react';
import { useState } from 'react';
import { sysSqliteDB } from 'src/utils/cogito-sql-actor/system-sqlite-db';

export const SQLEditorPage = () => {
  const [sqlText, setSqlText] = useState('');
  const [activeDB, setActiveDB] = useState<string>();
  const [activeTable, setActiveTable] = useState<string>();
  const [databases, setDatabases] = useState([
    {
      label: '系统库[sqlite]',
      value: 'cogito_fun_sys',
    },
  ]);
  const [databaseTables, setDatabaseTables] = useState([
    {
      label: '用户表[sqlite]',
      value: 'user',
    },
    {
      label: '角色表[sqlite]',
      value: 'roles',
    },
    {
      label: '权限表[sqlite]',
      value: 'permissions',
    },
    {
      label: '用户-角色表[sqlite]',
      value: 'user_roles',
    },
    {
      label: '角色-权限表[sqlite]',
      value: 'role_permissions',
    },
  ]);
  const handleExecSql = async () => {
    try {
      const execRes = await sysSqliteDB.db?.execute(sqlText);
      console.log(execRes);
      setSqlText('');
    } catch (e) {
      console.log(e);
    }
  };

  const handleDBChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // setValues(new Set(e.target.value.split(",")));
    setActiveDB(e.target.value);
  };

  const handleTableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // setValues(new Set(e.target.value.split(",")));
    setActiveTable(e.target.value);
  };

  return (
    <div className="p-4">
      <header className="flex mb-4">
        <Select
          variant="underlined"
          label="数据库名称"
          placeholder="请先选择一个数据库"
          className="max-w-xs"
          onChange={handleDBChange}
        >
          {databases.map((db) => (
            <SelectItem key={db.value} value={db.value}>
              {db.label}
            </SelectItem>
          ))}
        </Select>
        <Spacer x={4} />
        <Select
          variant="underlined"
          label="表名称"
          placeholder="选择一个数据库表"
          className="max-w-xs"
          onChange={handleTableChange}
        >
          {databaseTables.map((db) => (
            <SelectItem key={db.value} value={db.value}>
              {db.label}
            </SelectItem>
          ))}
        </Select>
      </header>
      <div className="mb-6">
        <Textarea
          variant="underlined"
          label="SQL语句"
          labelPlacement="outside"
          value={sqlText}
          placeholder="输入合法的SQL语句"
          onValueChange={setSqlText}
          className="col-span-12 md:col-span-6 mb-6 md:mb-0"
        />
      </div>
      <div>
        <Button color="primary" onClick={handleExecSql} isDisabled={!sqlText}>
          执 行
        </Button>
      </div>
    </div>
  );
};
