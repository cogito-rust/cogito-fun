interface Window {
  _bsa: any;
}

type SupportDBType = 'sqlite' | 'mysql' | 'postgresql';

type SVGIconProps = React.SVGProps<SVGSVGElement> & { size?: number };

interface DataSourceInfo {
  protocol: SupportDBType;
  host?: string;
  account?: string;
  password?: string;
  port?: number;
  dbName: string;
  dataSourceName: string;
}

interface StoreUserInfo {
  id: number;
  username: string;
  password: string;
  roles: string[];
  permissions: string[];
  lastLoginTime: number;
}

interface SqliteTableItem {
  name: string;
  rootpage?: number;
  sql?: string;
  tbl_name: string;
  type: string;
}
