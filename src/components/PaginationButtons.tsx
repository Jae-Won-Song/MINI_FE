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
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  currentPageGroup: number;
  setCurrentPageGroup: (pageGroup: number) => void;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  currentPageGroup,
  setCurrentPageGroup,
}) => {
  const pagesPerGroup = 10; // 한 페이지 그룹에 포함될 페이지 수

  const startPage = (currentPageGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  const handleClick = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
      const newGroup = Math.ceil(newPage / pagesPerGroup);
      if (newGroup !== currentPageGroup) {
        setCurrentPageGroup(newGroup);
      }
    }
  };

  return (
    <PaginationContainer>
      {currentPageGroup > 1 && (
        <PaginationButton
          onClick={() => setCurrentPageGroup(currentPageGroup - 1)}
        >
          &laquo;
        </PaginationButton>
      )}
      <PaginationButton
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </PaginationButton>
      {Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index,
      ).map((pageNumber) => (
        <PaginationButton
          key={pageNumber}
          active={currentPage === pageNumber}
          onClick={() => handleClick(pageNumber)}
        >
          {pageNumber}
        </PaginationButton>
      ))}
      <PaginationButton
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </PaginationButton>
      {currentPageGroup < Math.ceil(totalPages / pagesPerGroup) && (
        <PaginationButton
          onClick={() => setCurrentPageGroup(currentPageGroup + 1)}
        >
          &raquo;
        </PaginationButton>
      )}
    </PaginationContainer>
  );
};

export default PaginationButtons;
