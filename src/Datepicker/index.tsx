import { useState } from 'react';
import dayjs, { type Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import styled from 'styled-components';
import { calendarUtils } from './utils';

dayjs.extend(isBetween);

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
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [selectedDate, setSelectedDate] = useState<string[]>([]);
  const { prevMonthDays, days, nextMonthDays } = calendarUtils(currentDate);

  return (
    <Container>
      <Header>
        <Button
          onClick={() => {
            setCurrentDate(currentDate.subtract(1, 'month'));
          }}
        >
          ＜
        </Button>
        <span>
          {currentDate.format('YYYY')}年{currentDate.format('M')}月
        </span>
        <Button
          onClick={() => {
            setCurrentDate(currentDate.add(1, 'month'));
          }}
        >
          ＞
        </Button>
      </Header>
      <Body>
        {prevMonthDays.map(day => (
          <NoteCurrentMonthDay
            key={`${currentDate.subtract(1, 'month').format('YYYY-MM')}-${day}`}
            disabled
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

                if (selectedDate.length === 1 && selectedDate[0] !== selected)
                  setSelectedDate(pre => [...pre, selected]);
              }}
            >
              {day}日
            </Day>
          );
        })}
        {nextMonthDays.map(day => (
          <NoteCurrentMonthDay
            key={`${currentDate.add(1, 'month').format('YYYY-MM')}-${day}`}
            disabled
          >
            {day}日
          </NoteCurrentMonthDay>
        ))}
      </Body>
    </Container>
  );
};

export default Datepicker;