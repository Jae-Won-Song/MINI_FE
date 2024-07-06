import React from 'react';
import styled from 'styled-components';

interface CellProps {
  isDisabled: boolean;
  isStartDate: boolean;
  isEndDate: boolean;
  isToday: boolean;
  isPast: boolean;
  isCurrentMonth: boolean;
  isInRange: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const Cell: React.FC<CellProps> = ({
  isDisabled,
  isStartDate,
  isEndDate,
  isToday,
  isPast,
  isCurrentMonth,
  isInRange,
  onClick,
  children,
}) => {
  if (!isCurrentMonth) {
    return <div style={{ display: 'flex', flex: 1 }} />;
  }

  return (
    <CellWrapper
      isDisabled={isDisabled}
      isStartDate={isStartDate}
      isEndDate={isEndDate}
      isToday={isToday}
      isPast={isPast}
      isInRange={isInRange}
      onClick={!isPast ? onClick : undefined}
    >
      {children}
    </CellWrapper>
  );
};

const CellWrapper = styled.div<{
  isDisabled: boolean;
  isStartDate: boolean;
  isEndDate: boolean;
  isToday: boolean;
  isPast: boolean;
  isInRange: boolean;
}>`
  flex: 0 0 34.85px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  height: 37px;
  cursor: ${({ isPast }) => (isPast ? 'default' : 'pointer')};
  background-color: ${({ isStartDate, isEndDate, isInRange }) =>
    isStartDate
      ? '#f85b2b'
      : isEndDate
        ? '#F85B2B'
        : isInRange
          ? '#E8E8E8'
          : ''};
  color: ${({ isStartDate, isEndDate }) =>
    isStartDate ? '#ffffff' : isEndDate ? '#ffffff' : ''};
  border-top-left-radius: ${({ isStartDate }) => (isStartDate ? '6px' : '')};
  border-bottom-left-radius: ${({ isStartDate }) => (isStartDate ? '6px' : '')};
  border-top-right-radius: ${({ isEndDate }) => (isEndDate ? '6px' : '')};
  border-bottom-right-radius: ${({ isEndDate }) => (isEndDate ? '6px' : '')};
  font-weight: ${({ isToday }) => (isToday ? '900' : '')};
  color: ${({ isPast }) => (isPast ? '#A7A7A7' : '')};
  border: 1px solid transparent;
  box-sizing: border-box;
  position: relative;

  &::after {
    content: ${({ isToday }) => (isToday ? "'오늘'" : "''")};
    position: absolute;
    top: -1.5px;
    left: 0;
    font-size: 0.7rem;
    text-align: center;
    font-weight: 400;
    width: 100%;
    height: 100%;
  }

  &:hover {
    font-weight: 900;
  }
`;
