import { useMemo } from 'react';
import dayjs, { type Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);

export interface CalendarReturnType {
  currentDate: Dayjs;
  prevMonthDays: number[];
  days: number[];
  nextMonthDays: number[];
}

const useCalendar = (): CalendarReturnType => {
  const currentDate = dayjs().startOf('day');
  const daysInPrevMonth = currentDate.subtract(1, 'month').daysInMonth();
  const dayInCurrentMonth = currentDate.startOf('month').day();

  return useMemo(
    () => ({
      currentDate,
      days: Array.from(
        { length: currentDate.daysInMonth() },
        (_, index) => index + 1,
      ),
      prevMonthDays: Array.from(
        { length: dayInCurrentMonth },
        (_, index) => daysInPrevMonth - index,
      ).reverse(),
      nextMonthDays: Array.from(
        { length: 6 - currentDate.endOf('month').day() },
        (_, index) => index + 1,
      ),
    }),
    [currentDate, dayInCurrentMonth, daysInPrevMonth],
  );
};

export default useCalendar;
