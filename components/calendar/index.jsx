'use client';

import { cn } from 'drupal-canvas';
import { DayPicker } from 'react-day-picker';

const toMonth = (value) => {
  const [year, month] = String(value).split('-').map(Number);
  return new Date(Date.UTC(year || 2026, (month || 1) - 1, 1));
};

/**
 * Display only. DayPicker would otherwise read the clock during render, which
 * differs between server and client, so "today" is pinned and its marker hidden.
 */
const Calendar = ({ selectionMode = 'none', defaultMonth, className }) => {
  const month = toMonth(defaultMonth);

  return (
    <DayPicker
      className={cn('react-day-picker w-fit', className)}
      mode={selectionMode === 'single' ? 'single' : undefined}
      timeZone="UTC"
      defaultMonth={month}
      today={month}
      modifiersClassNames={{ today: '' }}
      classNames={{ today: '' }}
      showOutsideDays
    />
  );
};

export default Calendar;
