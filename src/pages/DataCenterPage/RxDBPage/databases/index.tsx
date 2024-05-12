import { Button } from '@nextui-org/react';
import { BreadcrumbsCogito } from 'src/components/BreadcrumbsCogito';
import Form from 'src/components/Form';
import { createRxDexieDatabase } from '../rxdb';
import { successToast } from 'src/utils/toaster';
// import { genSQLiteDB } from 'src/datasources';

export const RxDatabasePage = () => {
  const handleFinish = async (values: any) => {
    if (!values.name) return;

    // await genSQLiteDB(values.name);
  };
  return (
    <div className="p-3">
      <BreadcrumbsCogito />
      <main>
        <div>
          <Form
            fields={[
              {
                label: '数据库名称',
                field: 'name',
                fieldType: 'input',
              },
            ]}
            onFinish={handleFinish}
          />
        </div>
      </main>
    </div>
  );
};
