import { PostgreSQLSource } from 'src/features/database/PostgreSQL';

export const DataSourcePage = () => {
  return (
    <section className="flex justify-center w-full h-full">
      <PostgreSQLSource />
    </section>
  );
};
