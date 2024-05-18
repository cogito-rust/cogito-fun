import Database from '@tauri-apps/plugin-sql';
import { DB_TYPE_MAP_STORE_KEY, SQLITE_DATABASE_LIST } from 'src/constants';
import { nStore } from '../store';
import { notify } from '../toaster';
import _ from 'lodash';

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
  /**
   * **select**
   *
   * Passes in a SELECT query to the database for execution.
   *
   * @example
   * ```ts
   * // for sqlite & postgres
   * const result = await db.select(
   *    "SELECT * from todos WHERE id = $1", id
   * );
   *
   * // for mysql
   * const result = await db.select(
   *    "SELECT * from todos WHERE id = ?", id
   * );
   * ```
   */
  async queryColumns(tableName: string, protocol?: SupportDBType) {
    if (!this.db) return [];
    console.log(protocol);
    try {
      const res: any[] = await this.db.select(`SELECT * from ${tableName}`);

      return res;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async dropTable() {}

  async addColumn() {}
  /*
   * // for sqlite & postgres
   * // INSERT example
   * const result = await db.execute(
   *    "INSERT into todos (id, title, status) VALUES ($1, $2, $3)",
   *    [ todos.id, todos.title, todos.status ]
   * );
   * **/
  async insert(tableName: string, fields: string[], values: unknown[]) {
    if (!this.db) return null;

    if (fields.length !== values.length)
      return notify('Insert: fields and values length not match');

    let fieldPlacehold = '';
    let valuePlacehold = '';

    fields.forEach((field, index) => {
      if (index === fields.length - 1) {
        fieldPlacehold += `${field}`;
        valuePlacehold += `$${index + 1}`;
      }

      fieldPlacehold += `${field}, `;
      valuePlacehold += `$${index + 1}, `;
    });

    const result = await this.db.execute(
      `INSERT into ${tableName} (${fieldPlacehold}) VALUES (${valuePlacehold})`,
      values
    );
    return result;
  }

  async select(
    tableName: string,
    condition: Record<string, unknown>
  ): Promise<Record<string, unknown>[] | null> {
    if (!this.db) return [];

    const queryArr = _.toPairs(condition)[0];
    console.log('queryArr', queryArr);
    const result: Record<string, unknown>[] = await this.db.select(
      `SELECT * from ${tableName} WHERE ${queryArr[0]} = $1`,
      [queryArr[1]]
    );

    return result;
  }

  /**
   * example
   * 
   * 1. SELECT * FROM users WHERE name = 'Alice';
   * 
   * 2. cursor.execute("""
    SELECT * FROM users 
    WHERE (name = ? AND city = ?) 
       OR (age > ? AND city = ?)
    """, (name, city, age, city2))

   */
  async query() {}

  async update() {}

  async deleteRow() {}
}

export const sqlActor = (options: DataSourceInfo) =>
  new CogitoSQLActor(options);
