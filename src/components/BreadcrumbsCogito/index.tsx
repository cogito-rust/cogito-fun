import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import { Link, useMatches } from '@tanstack/react-router';

import { pathMapLocale } from './constant';

export const BreadcrumbsCogito = () => {
  const curMatches = useMatches();

  const mapMatches = curMatches.map((item) => {
    const curPathName = item.pathname.split('/').pop();
    console.log('path id: ', item.id);
    return {
      path: item.pathname,
      label: pathMapLocale[item.id] || curPathName,
    };
  });

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
