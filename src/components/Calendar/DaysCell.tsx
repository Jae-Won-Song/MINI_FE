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
  children
}) => {
  if (!isCurrentMonth) {
    return <CellWrapperInvisible />;
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
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  height: 35px;  
  cursor: ${({ isPast }) => (isPast ? 'default' : 'pointer')};
  background-color: ${({ isStartDate, isEndDate, isInRange }) => 
    isStartDate ? '#f85b2b' : 
    isEndDate ? '#F85B2B' : 
    isInRange ? '#E8E8E8' : ''};
  color: ${({ isStartDate, isEndDate }) => 
    isStartDate ? '#ffffff' : 
    isEndDate ? '#ffffff' : ''};
  border-top-left-radius: ${({ isStartDate }) => (isStartDate ? '50%' : '')};
  border-bottom-left-radius: ${({ isStartDate }) => (isStartDate ? '50%' : '')};
  border-top-right-radius: ${({ isEndDate }) => (isEndDate ? '50%' : '')};
  border-bottom-right-radius: ${({ isEndDate }) => (isEndDate ? '50%' : '')};  
  font-weight: ${({ isToday }) => (isToday ? '900' : '')};
  color: ${({ isPast }) => (isPast ? '#A7A7A7' : '')};  
  border: 1px solid transparent;
  box-sizing: border-box;
  position: relative;

  &:hover {
    border-color: #d3d3d3;
  }
`;

const CellWrapperInvisible = styled.div`
  flex: 1;
  display: flex;
`;

export default Cell;
