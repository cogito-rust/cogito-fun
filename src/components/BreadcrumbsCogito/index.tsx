import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import { Link, useMatches, useParentMatches } from '@tanstack/react-router';

import { pathMapLocale } from './constant';

export const BreadcrumbsCogito = () => {
  const curMatches = useMatches();

  const mapMatches = curMatches.map((item) => {
    const curPathName = item.pathname.split('/').pop();
    return {
      path: item.pathname,
      label: pathMapLocale[item.id] || curPathName,
    };
  });

  return (
    <div>
      <Breadcrumbs radius="md" variant="solid">
        {mapMatches.map((item) => (
          <BreadcrumbItem key={item.path}>
            <Link to={item.path}>{item.label}</Link>
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
    </div>
  );
};
