'use client';

import { cn } from 'drupal-canvas';
import { useEffect, useState } from 'react';

const ZERO = { days: 0, hours: 0, minutes: 0, seconds: 0 };

const remaining = (target) => {
  const ms = new Date(target).getTime() - Date.now();
  if (!(ms > 0)) {
    return ZERO;
  }
  const seconds = Math.floor(ms / 1000);
  return {
    days: Math.min(999, Math.floor(seconds / 86400)),
    hours: Math.floor(seconds / 3600) % 24,
    minutes: Math.floor(seconds / 60) % 60,
    seconds: seconds % 60,
  };
};

const Unit = ({ value, label }) => (
  <div className="flex flex-col">
    <span className="countdown font-mono text-4xl">
      <span style={{ '--value': value }} aria-live="polite" aria-label={String(value)}>
        {value}
      </span>
    </span>
    {label}
  </div>
);

/** Renders zeros first and reads the clock only after mount, for stable hydration. */
const Countdown = ({
  targetDate,
  showDays = true,
  showHours = true,
  showMinutes = true,
  showSeconds = true,
  className,
}) => {
  const [time, setTime] = useState(ZERO);

  useEffect(() => {
    const tick = () => setTime(remaining(targetDate));
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className={cn('flex flex-wrap gap-5', className)}>
      {showDays && <Unit value={time.days} label="days" />}
      {showHours && <Unit value={time.hours} label="hours" />}
      {showMinutes && <Unit value={time.minutes} label="minutes" />}
      {showSeconds && <Unit value={time.seconds} label="seconds" />}
    </div>
  );
};

export default Countdown;
