'use client';

import { FormattedText } from 'drupal-canvas';

import { useTableLevel } from '@/lib/table-context';

/** Child of table-row. The root must be the <th> or <td>. */
const TableCell = ({ text, isHeader = false, className }) => {
  const level = useTableLevel();
  const Element = isHeader ? 'th' : 'td';
  const cell = (
    <Element className={className}>
      <FormattedText>{text}</FormattedText>
    </Element>
  );

  if (level === 'row') {
    return cell;
  }

  return (
    <table className="table">
      <tbody>
        <tr>{cell}</tr>
      </tbody>
    </table>
  );
};

export default TableCell;
