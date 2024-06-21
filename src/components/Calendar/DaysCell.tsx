import React from 'react';
import styled from 'styled-components';
// import dayjs from 'dayjs';

interface CellProps {
  isDisabled: boolean;
  isSelected: boolean;
  isToday: boolean;
  onClick: () => void;  
}

const Cell: React.FC<CellProps> = ({ isDisabled, isSelected, isToday, onClick, children }) => {
  return (
    <CellWrapper
      isDisabled={isDisabled}
      isSelected={isSelected}
      isToday={isToday}
      onClick={onClick}
    >
      {children}
    </CellWrapper>
  );
};

const CellWrapper = styled.div<{ isDisabled: boolean; isSelected: boolean; isToday: boolean }>`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 9px;
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? '#F85B2B' : 'white')};  
  font-weight: ${({ isSelected }) => (isSelected ? '700' : '400')};
  color: ${({ isSelected }) => (isSelected ? 'white' : 'black')};
  opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
  border-radius: ${({ isToday }) => (isToday ? '50%' : '0')};
`;

export default Cell;
