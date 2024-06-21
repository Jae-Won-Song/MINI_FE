"use client"

import React, { useState } from 'react';
import styled from 'styled-components';

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

function PaginationButtons() {
  const [currentPage, setCurrentPage] = useState(1);
  // const totalPages = 10; // 마지막 페이지 수 수정 예정

  const handleClick = (page: number) => {
    if (page >= 1) {
      setCurrentPage(page);
    }
  };

  return (
    <PaginationContainer>
      <PaginationButton onClick={() => handleClick(1)}>&laquo;</PaginationButton>
      <PaginationButton onClick={() => handleClick(currentPage - 1)}>&lt;</PaginationButton>
      {[...Array(10)].map((_, index) => (
        <PaginationButton
          key={index + 1}
          active={currentPage === index + 1}
          onClick={() => handleClick(index + 1)}
        >
          {index + 1}
        </PaginationButton>
      ))}
      <PaginationButton onClick={() => handleClick(currentPage + 1)}>&gt;</PaginationButton>
      <PaginationButton onClick={() => handleClick(10)}>&raquo;</PaginationButton>
    </PaginationContainer>
  );
}

export default PaginationButtons;
