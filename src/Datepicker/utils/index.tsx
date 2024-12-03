import dayjs, { Dayjs } from 'dayjs';

// import LocaleData from 'dayjs/plugin/localeData';

// dayjs.extend(LocaleData);

dayjs.locale('zh-tw');

interface CalendarUtilsReturnType {
  prevMonthDays: number[];
  days: number[];
  nextMonthDays: number[];
  day: number;
}

export const calendarUtils = (currentDate: Dayjs): CalendarUtilsReturnType => {
  const daysInPrevMonth = currentDate.subtract(1, 'month').daysInMonth();
  const dayInCurrentMonth = currentDate.startOf('month').day();

  return {
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
  };
};
