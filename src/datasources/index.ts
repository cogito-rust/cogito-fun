import Database from '@tauri-apps/plugin-sql';

export const dbInstance = new Map<string, Database>();

export const genAndStorePsqlDB = async (dataInfo: DataSourceInfo) => {
  const { protocol, host, account, password, dbName } = dataInfo;
  let dbUrl = `${protocol}://${account}:${password}@${host}/${dbName}`;

  if (!password?.trim()) {
    dbUrl = `${protocol}://${account}@${host}/${dbName}`;
  }

  console.log(dbUrl, 'dbUrl');

  try {
    const db = await Database.load(dbUrl);
    dbInstance.set(dbName, db);
    // await nStore.set(dbName, db);
    // await nStore.save();
  } catch (e) {
    console.log('generating db error: ', e);
  }
};

export const connectSQLiteDB = async (dbName: string) => {
  if (!dbName) return;

  try {
    const db = await Database.load(`sqlite:${dbName}.db`);
    console.log(db);
    // nStore.set('sqlite_db_list', [
    //   {
    //     name: dbName,
    //     stamp: new Date().getTime(),
    //   },
    // ]);
    return db;
  } catch (e) {
    console.log('generating db error: ', e);
  }
};
