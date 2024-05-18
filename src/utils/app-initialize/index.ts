import { error } from '@tauri-apps/plugin-log';
import { BaseDirectory, resolveResource } from '@tauri-apps/api/path';
import {
  readTextFile,
  exists,
  readDir,
  writeFile,
} from '@tauri-apps/plugin-fs';
import { sysSqliteDB } from '../cogito-sql-actor/system-sqlite-db';
import Database from '@tauri-apps/plugin-sql';
import { nStore } from '../store';
import { INIT_STORE_SUCCESS } from 'src/constants';

export const appInit = async () => {
  try {
    await sysSqliteDB.createSQLiteInstance();
    const sysDB = await sysSqliteDB.getSQLiteInstance('cogito_fun_sys');
    console.log('sysDB: ', sysDB);

    if (!sysDB) return;

    await initUserTable(sysDB);
    await initRoleTable(sysDB);
    await initPermissionTable(sysDB);
    await initUserRolesTable(sysDB);
    await initRolePermissionsTable(sysDB);
    await seed(sysDB);
    return true;
    // initializing system database and creating tables
  } catch (e: any) {
    error('App initializing failed: ', e?.message || e);
    return false;
  }
};

async function initUserTable(db: Database) {
  const sqlText = await readTextFile('sqls/create_user_table.sql', {
    baseDir: BaseDirectory.Resource,
  });
  try {
    const res = await db.execute(sqlText);

    console.log('init user: ', res);
  } catch (e: any) {
    console.log('init user error: ', e?.message || e);
  }
}

async function initRoleTable(db: Database) {
  const sqlText = await readTextFile('sqls/create_roles_table.sql', {
    baseDir: BaseDirectory.Resource,
  });
  const res = await db.execute(sqlText);
  console.log('init role: ', res);
}

async function initPermissionTable(db: Database) {
  const sqlText = await readTextFile('sqls/create_permissions_table.sql', {
    baseDir: BaseDirectory.Resource,
  });
  const res = await db.execute(sqlText);
  console.log('init permission: ', res);
}

async function initUserRolesTable(db: Database) {
  const sqlText = await readTextFile('sqls/create_user_roles_table.sql', {
    baseDir: BaseDirectory.Resource,
  });
  const res = await db.execute(sqlText);
  console.log('init user-roles: ', res);
}

async function initRolePermissionsTable(db: Database) {
  const sqlText = await readTextFile('sqls/create_role_permissions_table.sql', {
    baseDir: BaseDirectory.Resource,
  });
  const res = await db.execute(sqlText);
  console.log('role-permissions: ', res);
}

async function seed(db: Database) {
  try {
    const sqlText = await readTextFile('sqls/seed_sys.sql', {
      baseDir: BaseDirectory.Resource,
    });
    await db.execute(sqlText);
  } catch (e: any) {
    console.log('seed errors: ', e?.message || e);
  }
}
