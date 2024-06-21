import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import DaysRow from './DaysRow';
import Cell from './DaysCell';

interface MonthProps {
  month: dayjs.Dayjs;
}

const Month: React.FC<MonthProps> = ({ month }) => {
  const renderCells = (month: dayjs.Dayjs) => {
    const monthStart = month.startOf('month');
    const monthEnd = month.endOf('month');
    const startDate = monthStart.startOf('week');
    const endDate = monthEnd.endOf('week');

    const rows = [];
    let days = [];
    let day = startDate;

    while (day.isBefore(endDate, 'day')) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = day.format('D');
        const cloneDay = day;
        days.push(
          <Cell
            key={day.toString()}
            isDisabled={!day.isSame(month, 'month')}
            isSelected={day.isSame(dayjs(), 'day')}
            isToday={day.isSame(dayjs(), 'day')}
            onClick={() => console.log(cloneDay.toString())}
          >
            <span>{formattedDate}</span>
          </Cell>
        );
        day = day.add(1, 'day');
      }
      rows.push(<Row key={day.toString()}>{days}</Row>);
      days = [];
    }
    return <MonthContainer>{rows}</MonthContainer>;
  };

  return (
    <MonthWrapper>
      <DaysRow />
      {renderCells(month)}
    </MonthWrapper>
  );
};

const MonthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MonthContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
`;

export default Month;