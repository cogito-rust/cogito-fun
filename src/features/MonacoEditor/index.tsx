import { Button, Textarea } from '@nextui-org/react';
import { useState } from 'react';
import { connectSQLiteDB, dbInstance } from 'src/datasources';
import { nStore } from 'src/utils/store';
import {
  join,
  appDataDir,
  appLocalDataDir,
  appConfigDir,
  appLogDir,
  appCacheDir,
} from '@tauri-apps/api/path';
import { basename } from 'path';

export const MonacoEditorFeature = () => {
  const [sql, setSql] = useState('');

  const handleExec = async () => {
    // if (!sql) return;
    const sqliteDB = await connectSQLiteDB('cogito_dev');
    // if (db) {
    //   console.log(db);
    if (sqliteDB) {
      const createRes = await sqliteDB.execute(`CREATE TABLE todos(
        id   INT PRIMARY KEY     NOT NULL,
        title   TEXT    NOT NULL,
        status  CHAR(50)   NOT NULL
     )`);

      console.log(createRes, 'createRes');

      sqliteDB.execute;
      const res = await sqliteDB.execute(
        'INSERT into todos (id, title, status) VALUES ($1, $2, $3)',
        [1, 'daily task', 'done']
      );

      console.log(res);
    }
    // }
  };

  const handleExecTable = async () => {
    const sqliteDB = await connectSQLiteDB('cogito_dev');

    if (sqliteDB) {
      const createRes = await sqliteDB.execute(`CREATE TABLE todos(
        id   INT PRIMARY KEY     NOT NULL,
        title   TEXT    NOT NULL,
        status  CHAR(50)   NOT NULL
     )`);

      console.log(createRes, 'createRes', sqliteDB);
    }
  };

  const handleDelTable = async () => {
    const sqliteDB = await connectSQLiteDB('cogito_dev');

    if (sqliteDB) {
      const createRes = await sqliteDB.execute(`DROP TABLE todos`);

      console.log(createRes, 'createRes', sqliteDB);
    }
  };

  const handleDBPath = async () => {
    const sqliteDB = await connectSQLiteDB('cogito_dev');

    const appDataDirPath = await appDataDir();
    const localPath = await appLocalDataDir();
    const config = await appConfigDir();
    // const baseName = await basename()
    const logD = await appLogDir();
    const cacheD = await appCacheDir();
    console.log(
      sqliteDB?.path,
      appDataDirPath,
      localPath,
      config,
      logD,
      cacheD
    );
  };

  const handleDBInstance = async () => {
    const sqliteDB = await connectSQLiteDB('cogito_dev');
    console.log(sqliteDB);
  };

  return (
    <div>
      <div>
        <Textarea onValueChange={setSql} />
      </div>

      <div>
        <Button color="primary" onClick={handleExec}>
          Execute
        </Button>

        <Button color="primary" onClick={handleExecTable}>
          Create Table
        </Button>

        <Button color="primary" onClick={handleDelTable}>
          Del Table
        </Button>

        <Button color="secondary" onClick={handleDBPath}>
          query path
        </Button>

        <Button color="warning" onClick={handleDBInstance}>
          db instance
        </Button>
      </div>
    </div>
  );
};
