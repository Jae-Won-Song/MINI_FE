'use client';

import React from 'react';
import styled from 'styled-components';

interface PaginationButtonsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
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

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPaginationButtons = () => {
    const visiblePages = 10;
    const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    const pages = [];
    for (let i = startPage; i <= endPage; i = +1) {
      pages.push(
        <PaginationButton
          key={i}
          active={currentPage === i}
          onClick={() => handleClick(i)}
        >
          {i}
        </PaginationButton>,
      );
    }

    return pages;
  };

  return (
    <PaginationContainer>
      <PaginationButton onClick={() => handleClick(1)}>
        &laquo;
      </PaginationButton>
      <PaginationButton onClick={() => handleClick(currentPage - 1)}>
        &lt;
      </PaginationButton>
      {renderPaginationButtons()}
      <PaginationButton onClick={() => handleClick(currentPage + 1)}>
        &gt;
      </PaginationButton>
      <PaginationButton onClick={() => handleClick(totalPages)}>
        &raquo;
      </PaginationButton>
    </PaginationContainer>
  );
};

export default PaginationButtons;
