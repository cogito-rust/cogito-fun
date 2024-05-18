import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import { Link, useMatches, useSearch } from '@tanstack/react-router';

import { pathMapLocale } from './constant';

export const BreadcrumbsCogito = () => {
  const curMatches = useMatches();
  const { tableName } = useSearch({ strict: false }) as { tableName: string };

  const mapMatches = curMatches.map((item) => {
    const curPathName = item.pathname.split('/').pop();

    return {
      path: item.pathname,
      label: pathMapLocale[item.id] || curPathName,
    };
  });

  if (tableName) {
    mapMatches.splice(mapMatches.length - 1, 0, {
      path: `/datasource`,
      label: pathMapLocale['/datasource'],
    });
  }

  return (
    <div className="absolute top-0  w-full px-3 py-2">
      <Breadcrumbs size="sm">
        {mapMatches.map((item) => (
          <BreadcrumbItem key={item.path}>
            <Link to={item.path}>{item.label}</Link>
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
    </div>
  );
};
