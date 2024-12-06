import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import dayjs from 'dayjs';
import useCalendar from '../useCalendar';

describe('mock useCalendar return data', () => {
  const mockDate = '2024-11-01';

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(mockDate));
  });

  it('return calendar date', () => {
    const { result } = renderHook(useCalendar);

    expect(result.current).toEqual({
      currentDate: dayjs(mockDate).startOf('day'),
      prevMonthDays: [27, 28, 29, 30, 31],
      days: Array.from({ length: 30 }, (_, index) => index + 1),
      nextMonthDays: [],
    });
  });
});
