import Database from '@tauri-apps/plugin-sql';
import { DB_TYPE_MAP_STORE_KEY, SQLITE_DATABASE_LIST } from 'src/constants';
import { nStore } from '../store';
import { notify } from '../toaster';

type CogitoSQLActorOptions = Omit<DataSourceInfo, 'dataSourceName'>;

class CogitoSQLActor {
  db: Database | null;

  constructor(public options: DataSourceInfo) {
    this.db = null;

    this.initDB();
  }

  async initDB() {
    const db = await this.getSQLiteInstance(this.options.dbName);

    this.db = db;
  }

  async createDBInstance() {
    const { protocol } = this.options;

    const dbMap: Record<SupportDBType, CallableFunction> = {
      sqlite: this.createSQLiteInstance,
      mysql: this.createMySQLInstance,
      postgresql: this.createPostgreSQLInstance,
    };

    try {
      await dbMap[protocol]();
    } catch (e) {
      // TODO: error handling
    }
  }

  async checkDBInStore(options: Partial<DataSourceInfo>) {
    const { protocol, dbName } = options;

    if (!protocol || !dbName) return false;

    const dbKey = DB_TYPE_MAP_STORE_KEY[protocol];

    const dbStoreObj: Record<string, any> = (await nStore.get(dbKey)) || {};

    if (!dbStoreObj[dbName]) return false;

    return true;
  }

  async createSQLiteInstance(notifying = false) {
    const { dbName, dataSourceName } = this.options;

    const existedCurDB = await this.checkDBInStore(this.options);

    if (existedCurDB) {
      notifying && notify(`${dbName}已存在`);
      return;
    }

    const db = await Database.load(`sqlite:${dbName}`);

    this.db = db;

    await nStore.set(SQLITE_DATABASE_LIST, {
      [dbName]: {
        dbName,
        protocol: 'sqlite',
        dataSourceName,
      },
    });
    await nStore.save();
  }

  async getSQLiteInstance(dbName: string) {
    const db = await Database.load(`sqlite:${dbName}`);

    return db;
  }

  async createMySQLInstance() {
    const { account, password, host, port = 3306, dbName } = this.options;
    const db = await Database.load(
      `mysql://${account}:${password}@${host}:${port}/${dbName}`
    );

    this.db = db;
  }

  async createPostgreSQLInstance() {
    const { account, password, host, port = 5432, dbName } = this.options;
    const db = await Database.load(
      `postgres://${account}:${password}@${host}:${port}/${dbName}`
    );

    this.db = db;
  }

  async createTable(sql: string) {
    if (!this.db) return;

    try {
      const res = await this.db.execute(sql);

      console.log('createTable', res);
    } catch (e) {
      console.log(e);
    }
  }

  async queryTables() {
    if (!this.db) return [];

    try {
      const res: SqliteTableItem[] = await this.db.select(
        `SELECT * FROM sqlite_master WHERE type='table'`
      );

      return Array.isArray(res)
        ? res.map(({ name, tbl_name, type }) => ({
            name,
            tbl_name,
            type,
          }))
        : [];
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async dropTable() {}

  async addColumn() {}

  async insert() {}

  async select() {}

  async update() {}

  async deleteRow() {}
}

export const sqlActor = (options: DataSourceInfo) =>
  new CogitoSQLActor(options);
