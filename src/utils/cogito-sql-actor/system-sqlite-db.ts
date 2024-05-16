import { sqlActor } from './index';

export const sysSqliteDB = sqlActor({
  protocol: 'sqlite',
  dataSourceName: '系统库',
  dbName: 'cogito_fun_sys',
});
