'use client';

import { cn } from 'drupal-canvas';

import { TableProvider, useTableLevel } from '@/lib/table-context';
import TableCell from '@/components/table-cell';
import { sample } from '@/lib/sample';

/** Child of table. The root must be the <tr>. */
const TableRow = ({ active = false, cells, className }) => {
  const level = useTableLevel();
  const row = (
    <tr className={cn(active && 'bg-base-200', className)}>
      <TableProvider level="row">{sample(cells, () => (
        <>
          <TableCell text="Name" isHeader />
          <TableCell text="Value" />
        </>
      ))}</TableProvider>
    </tr>
  );

  if (level === 'table') {
    return row;
  }

  return (
    <table className="table">
      <tbody>{row}</tbody>
    </table>
  );
};

export default TableRow;
