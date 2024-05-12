import Form, { FormField } from 'src/components/Form';
import { genAndStorePsqlDB } from 'src/datasources';

const DATA_SOURCE_FIELDS: FormField[] = [
  {
    label: '数据库类型',
    field: 'protocol',
    fieldType: 'input',
  },
  {
    label: '连接地址',
    field: 'host',
    fieldType: 'input',
  },
  {
    label: '账号',
    field: 'account',
    fieldType: 'input',
  },
  {
    label: '密码',
    field: 'password',
    fieldType: 'input',
  },
  {
    label: '数据库名称',
    field: 'dbName',
    fieldType: 'input',
  },
];

export const PostgreSQLSource = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleConnect = async (values: any) => {
    console.log(values);
    await genAndStorePsqlDB(values);
  };
  return (
    <div>
      <Form
        onFinish={handleConnect}
        fields={DATA_SOURCE_FIELDS}
        initialValues={{
          protocol: 'postgres',
          host: 'localhost',
          account: 'cogito',
          password: '123456',
          dbName: '',
        }}
      />
    </div>
  );
};
