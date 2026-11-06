'use client';

import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

import { TableProvider } from '@/lib/table-context';
import TableCell from '@/components/table-cell';
import TableRow from '@/components/table-row';
import { sample } from '@/lib/sample';

const tableVariants = cva('', {
  variants: {
    zebra: {
      true: 'table-zebra',
      false: '',
    },
    pinRows: {
      true: 'table-pin-rows',
      false: '',
    },
    pinCols: {
      true: 'table-pin-cols',
      false: '',
    },
    size: {
      xs: 'table-xs',
      sm: 'table-sm',
      md: 'table-md',
      lg: 'table-lg',
      xl: 'table-xl',
    },
  },
});

const Table = ({
  zebra = false,
  pinRows = false,
  pinCols = false,
  size,
  header,
  rows,
  className,
}) => {
  const sampledHeader = sample(header, () => (
    <TableRow cells={<><TableCell text="Name" isHeader /><TableCell text="Job" isHeader /><TableCell text="Colour" isHeader /></>} />
  ));

  // cn() would delete the table root class, so it stays outside. A pinned row
  // only sticks inside a scroll container, which needs a height limit.
  return (
    <div className={cn('overflow-x-auto', pinRows && 'max-h-80', className)}>
      <table
        className={`table ${tableVariants({ zebra, pinRows, pinCols, size })}`}
      >
        <TableProvider level="table">
          {sampledHeader && <thead>{sampledHeader}</thead>}
          <tbody>{sample(rows, () => (
            <>
              <TableRow cells={<><TableCell text="Person 1" isHeader /><TableCell text="Quality engineer" /><TableCell text="Blue" /></>} />
              <TableRow cells={<><TableCell text="Person 2" isHeader /><TableCell text="Designer" /><TableCell text="Green" /></>} />
              <TableRow cells={<><TableCell text="Person 3" isHeader /><TableCell text="Writer" /><TableCell text="Red" /></>} />
            </>
          ))}</tbody>
        </TableProvider>
      </table>
    </div>
  );
};

export default Table;
