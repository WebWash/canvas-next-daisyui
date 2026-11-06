'use client';

import { cn } from 'drupal-canvas';
import { usePageContext } from 'drupal-canvas/react';

import BreadcrumbItem from '@/components/breadcrumb-item';
import { sample } from '@/lib/sample';

/** With an empty slot, reads the trail from page context. Empty in Workbench. */
const Breadcrumbs = ({ items, className }) => {
  const trail = usePageContext()?.breadcrumbs ?? [];

  return (
    <nav aria-label="Breadcrumb" className={cn('breadcrumbs text-sm', className)}>
      <ul>
        {sample(items, () => (
          <>
            <BreadcrumbItem label="Home" link="/" icon="home" />
            <BreadcrumbItem label="Documents" link="/documents" />
            <BreadcrumbItem label="Add document" />
          </>
        )) ??
          trail.map((crumb, index) => (
            <li key={`${index}-${crumb.url}`}>
              {crumb.url ? <a href={crumb.url}>{crumb.text}</a> : crumb.text}
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
