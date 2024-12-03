import { useState } from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import styled from 'styled-components';
import Next from './icons/Next';
import Previous from './icons/Previous';
import useCalendar from './useCalendar';

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);

const Container = styled.div`
  width: 350px;
  height: 240px;
  font-size: 16px;
  color: #000;
`;
const Header = styled.div`
  width: 100%;
  height: 44px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;

  > span {
    flex: 1;
    text-align: center;
  }
`;

const DefaultButton = styled.button`
  background-color: #fff;
  border: none;
  color: #000;
  cursor: pointer;

  &:hover {
    background-color: #e6e6e6;
  }
`;

const Button = styled(DefaultButton)`
  width: 44px;
  height: 44px;

  svg {
    width: 14px;
  }
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 50px);
`;

const Day = styled(DefaultButton)<{ isToday?: boolean; isBetween?: boolean }>`
  text-align: center;
  height: 36px;
  line-height: 36px;
  cursor: pointer;
  ${({ isToday, isBetween }) => {
    if (isBetween)
      return `
        background-color: #006edc;
        color: #fff;
      `;

    if (isToday)
      return `
        background-color: #ffff76;
      `;
  }}

  &:hover {
    background-color: #e6e6e6;
  }
`;
const NoteCurrentMonthDay = styled(Day)`
  color: #757575;
  cursor: not-allowed;
`;

const Datepicker = () => {
  const [selectedDate, setSelectedDate] = useState<string[]>([]);
  const { currentDate, prevMonthDays, days, nextMonthDays } = useCalendar();

  return (
    <Container>
      <Header>
        <Button>
          <Previous />
        </Button>
        <span>
          {currentDate.format('YYYY')}年{currentDate.format('M')}月
        </span>
        <Button>
          <Next />
        </Button>
      </Header>
      <Body>
        {prevMonthDays.map(day => (
          <NoteCurrentMonthDay
            disabled
            key={`${currentDate.subtract(1, 'month').format('YYYY-MM')}-${day}`}
            isToday={dayjs().isSame(
              dayjs(
                `${currentDate.subtract(1, 'month').format('YYYY-MM')}-${day}`,
              ),
              'day',
            )}
          >
            {day}日
          </NoteCurrentMonthDay>
        ))}
        {days.map(day => {
          const currentDay = `${currentDate.format('YYYY-MM')}-${day}`;
          const isBetween =
            selectedDate.length === 2
              ? dayjs(currentDay).isBetween(
                  selectedDate[0],
                  selectedDate[1],
                  null,
                  '[]',
                )
              : dayjs(currentDay).isBetween(
                  selectedDate[0],
                  selectedDate[0],
                  null,
                  '[]',
                );

          return (
            <Day
              key={`${currentDate.format('YYYY-MM')}-${day}`}
              isToday={dayjs().isSame(
                dayjs(`${currentDate.format('YYYY-MM')}-${day}`),
                'day',
              )}
              isBetween={isBetween}
              onClick={() => {
                const selected = `${currentDate.format('YYYY-MM')}-${day}`;

                if (selectedDate.length === 0 || selectedDate.length === 2)
                  setSelectedDate([selected]);

                if (selectedDate.length === 1)
                  if (dayjs(selectedDate[0]).isSameOrAfter(selected, 'day'))
                    setSelectedDate([selected]);
                  else setSelectedDate(pre => [...pre, selected]);
              }}
            >
              {day}日
            </Day>
          );
        })}
        {nextMonthDays.map(day => (
          <NoteCurrentMonthDay
            disabled
            key={`${currentDate.add(1, 'month').format('YYYY-MM')}-${day}`}
            isToday={dayjs().isSame(
              dayjs(`${currentDate.add(1, 'month').format('YYYY-MM')}-${day}`),
              'day',
            )}
          >
            {day}日
          </NoteCurrentMonthDay>
        ))}
      </Body>
    </Container>
  );
};

export default Datepicker;
