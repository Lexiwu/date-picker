import '@testing-library/jest-dom';
import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import useCalendar from '../useCalendar';
import Datepicker from '..';

describe('useCalendar', () => {
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

  it('not active month day', async () => {
    const { result } = renderHook(useCalendar);
    const notActiveDays = [
      ...result.current.prevMonthDays,
      ...result.current.nextMonthDays,
    ];

    render(<Datepicker />);

    const notActiveDaysButtons = await screen.findAllByRole('button', {
      name: 'notActive',
    });

    expect(notActiveDaysButtons).toHaveLength(notActiveDays.length);

    for (let i = 0; i < notActiveDaysButtons.length; i++) {
      expect(notActiveDaysButtons[i]).toHaveStyle({
        color: '#757575',
      });
      expect(notActiveDaysButtons[i]).toBeDisabled();
      expect(notActiveDaysButtons[i].innerHTML).toBe(`${notActiveDays[i]}日`);

      userEvent.hover(notActiveDaysButtons[i]);

      expect(notActiveDaysButtons[i]).toHaveStyle({
        backgroundColor: '#e6e6e6',
      });
    }
  });

  it('active month day', async () => {
    const { result } = renderHook(useCalendar);
    const activeDays = result.current.days;

    render(<Datepicker />);

    const activeDaysButtons = await screen.findAllByRole('button', {
      name: 'active',
    });

    expect(activeDaysButtons).toHaveLength(activeDays.length);

    for (let i = 0; i < activeDaysButtons.length; i++) {
      expect(activeDaysButtons[i]).toHaveStyle({
        color: '#000',
      });
      expect(activeDaysButtons[i]).not.toBeDisabled();
      expect(activeDaysButtons[i].innerHTML).toBe(`${activeDays[i]}日`);

      userEvent.hover(activeDaysButtons[i]);

      expect(activeDaysButtons[i]).toHaveStyle({
        backgroundColor: '#e6e6e6',
      });
    }
  });
});
