import { useMemo } from 'react';
import dayjs, { type Dayjs } from 'dayjs';

interface CalendarReturnType {
  currentDate: Dayjs;
  prevMonthDays: number[];
  days: number[];
  nextMonthDays: number[];
  day: number;
}

const useCalendar = (): CalendarReturnType => {
  const currentDate = dayjs();
  const daysInPrevMonth = currentDate.subtract(1, 'month').daysInMonth();
  const dayInCurrentMonth = currentDate.startOf('month').day();

  return useMemo(
    () => ({
      currentDate,
      days: Array.from(
        { length: currentDate.daysInMonth() },
        (_, index) => index + 1,
      ),
      day: Number(currentDate.format('DD')),
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
