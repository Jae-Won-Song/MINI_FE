import React from 'react';
import styled from 'styled-components';
import Buttons from './Buttons';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  onResetFilters?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = '일치하는 것이 없습니다.',
  subtitle = '일부 필터를 변경하거나 제거해 주십시오.',
  showReset,
  onResetFilters,
}) => {
  return (
    <Container>
      <StyledHeading>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </StyledHeading>
      {showReset && (
        <Buttons
          label="전체 보기"
          onClick={onResetFilters}
          fullHeight={false}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  height: 60px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const StyledHeading = styled.div`
  text-align: center;
  margin-bottom: 20px;

  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    color: #555;
  }
`;

export default EmptyState;
