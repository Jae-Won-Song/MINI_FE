import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0 0 0;
`;

const PaginationButton = styled.button<{ active?: boolean }>`
  font-weight: ${(props) => (props.active ? '900' : '400')};
  color: ${(props) => (props.active ? '#000' : '#767676')};
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background: #000;
    color: white;
  }
`;

interface PaginationButtonsProps {
  page: number;
  totalItems: number;
  perPage: number;
  onPageChange: (page: number) => void;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({ page, totalItems, perPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / perPage);

  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <PaginationContainer>
      <PaginationButton onClick={() => handleClick(1)}>&laquo;</PaginationButton>
      <PaginationButton onClick={() => handleClick(page - 1)}>&lt;</PaginationButton>
      {[...Array(totalPages)].map((_, index) => (
        <PaginationButton
          key={index + 1}
          active={page === index + 1}
          onClick={() => handleClick(index + 1)}
        >
          {index + 1}
        </PaginationButton>
      ))}
      <PaginationButton onClick={() => handleClick(page + 1)}>&gt;</PaginationButton>
      <PaginationButton onClick={() => handleClick(totalPages)}>&raquo;</PaginationButton>
    </PaginationContainer>
  );
}

export default PaginationButtons;
