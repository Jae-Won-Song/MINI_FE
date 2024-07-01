import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import DaysRow from './DaysRow';
import Cell from './DaysCell';

interface MonthProps {
  month: dayjs.Dayjs;
  startDate: dayjs.Dayjs | null;
  endDate: dayjs.Dayjs | null;
  onDateClick: (date: dayjs.Dayjs) => void;
}

const Month: React.FC<MonthProps> = ({
  month,
  startDate,
  endDate,
  onDateClick,
}) => {
  const renderCells = (month: dayjs.Dayjs) => {
    const monthStart = month.startOf('month');
    const monthEnd = month.endOf('month');
    const startDateOfMonth = monthStart.startOf('week');
    const endDateOfMonth = monthEnd.endOf('week');

    const rows = [];
    let days = [];
    let day = startDateOfMonth;

    while (day.isBefore(endDateOfMonth, 'day')) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = day.format('D');
        const cloneDay = day;
        const isPast = day.isBefore(dayjs(), 'day');
        const isStartDate = startDate && day.isSame(startDate, 'day');
        const isEndDate = endDate && day.isSame(endDate, 'day');
        const isCurrentMonth = day.isSame(month, 'month');
        const isInRange =
          startDate &&
          endDate &&
          day.isAfter(startDate, 'day') &&
          day.isBefore(endDate, 'day');

        days.push(
          <Cell
            key={day.toString()}
            isDisabled={!isCurrentMonth}
            isStartDate={isStartDate}
            isEndDate={isEndDate}
            isToday={day.isSame(dayjs(), 'day')}
            isPast={isPast}
            isCurrentMonth={isCurrentMonth}
            isInRange={isInRange}
            onClick={() => onDateClick(cloneDay)}
          >
            <span>{formattedDate}</span>
          </Cell>,
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
  position: relative;

  &:first-child {
    &::after {
      content: '';
      position: absolute;
      height: 92%;
      right: -6px;
      bottom: 9px;
      border-right: 1px solid #d3d3d3;
    }
  }
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
