import React from 'react';
import styled from 'styled-components';

const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

const DaysRow: React.FC = () => {
  return (
    <DaysRowContainer>
      {dayNames.map((day, index) => (
        <DaysColumn key={index}>
          {day}
        </DaysColumn>
      ))}
    </DaysRowContainer>
  );
};

const DaysRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3px;
  background-color: #F6D6CD;
`;

const DaysColumn = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-weight: bold;  
`;

export default DaysRow;
