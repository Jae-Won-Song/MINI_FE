'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import PaginationButtons from '../PaginationButtons'; // PaginationButtons 컴포넌트 임포트
import Categories from '../Categories/Categories';
import EmptyState from '../EmptyState';
import AccommodationCard from '../AccomodationCard';

interface Accommodation {
  id: number;
  title: string;
  address: string;
  category: string;
  image: string;
  thumbnail: string;
  price: number;
  latitude: number;
  longitude: number;
  likeCount: number;
  rating: number;
}

interface APIResponse {
  resultCode: number;
  resultMessage: string;
  data: {
    totalElements: number;
    totalPages: number;
    size: number;
    currentPage: number;
    content: Accommodation[];
  };
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ThemeSearch: React.FC = () => {
  const [page, setPage] = useState(1);
  const [currentPageGroup, setCurrentPageGroup] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');

  const apiUrl = selectedCategory
    ? `https://yusuengdo.ddns.net/open-api/accommodation?category=${selectedCategory}&page=${page}`
    : `https://yusuengdo.ddns.net/open-api/accommodation?page=${page}`;

  const { data, error } = useSWR<APIResponse>(apiUrl, fetcher);
  console.log('Accommodation Data', data);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setPage(1); // 카테고리 변경 시 페이지를 1로 초기화
  };

  const handleResetFilters = () => {
    setSelectedCategory('');
    setPage(1);
  };

  if (error) return <LoadingFail>로딩 실패!</LoadingFail>;
  if (!data) return <Loading />;

  const {
    content: accommodations = [], // accomodations -> accommodations로 수정
    totalElements = 0,
    totalPages = 0,
  } = data.data || {};
  const showEmptyState = data.resultCode === 404 || accommodations.length === 0;

  console.log('Total Pages:', totalPages);
  console.log('Total Items:', totalElements);

  return (
    <ThemeWrapper>
      <Categories
        onCategoryChange={handleCategoryChange}
        selectedCategory={selectedCategory}
      />
      {showEmptyState ? (
        <EmptyState showReset onResetFilters={handleResetFilters} />
      ) : (
        <>
          <GridWrapper>
            {accommodations.map((accommodation) => (
              <AccommodationCard key={accommodation.id} data={accommodation} />
            ))}
          </GridWrapper>
          <PaginationButtons
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            currentPageGroup={currentPageGroup}
            setCurrentPageGroup={setCurrentPageGroup}
          />
        </>
      )}
    </ThemeWrapper>
  );
};

const ThemeWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding-top: 30px;

  @media (min-width: 1080px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Loading = styled.div`
  width: 80px;
  aspect-ratio: 2;
  margin: auto;
  --c: linear-gradient(#ffd412 25%, #abd406 0 50%, #ff821c 0 75%, #ffd412 0);
  background: var(--c), var(--c), var(--c), var(--c);
  background-size: 26% 400%;
  background-position:
    calc(0 * 100% / 3) 100%,
    calc(1 * 100% / 3) 100%,
    calc(2 * 100% / 3) 100%,
    calc(3 * 100% / 3) 100%;
  background-repeat: no-repeat;
  animation: l10 2s infinite;

  @keyframes l10 {
    0% {
      background-position:
        calc(0 * 100% / 3) calc(3 * 100% / 3),
        calc(1 * 100% / 3) calc(3 * 100% / 3),
        calc(2 * 100% / 3) calc(3 * 100% / 3),
        calc(3 * 100% / 3) calc(3 * 100% / 3);
    }
    8.33% {
      background-position:
        calc(0 * 100% / 3) calc(2 * 100% / 3),
        calc(1 * 100% / 3) calc(3 * 100% / 3),
        calc(2 * 100% / 3) calc(3 * 100% / 3),
        calc(3 * 100% / 3) calc(3 * 100% / 3);
    }
    16.67% {
      background-position:
        calc(0 * 100% / 3) calc(2 * 100% / 3),
        calc(1 * 100% / 3) calc(2 * 100% / 3),
        calc(2 * 100% / 3) calc(3 * 100% / 3),
        calc(3 * 100% / 3) calc(3 * 100% / 3);
    }
    25% {
      background-position:
        calc(0 * 100% / 3) calc(2 * 100% / 3),
        calc(1 * 100% / 3) calc(2 * 100% / 3),
        calc(2 * 100% / 3) calc(2 * 100% / 3),
        calc(3 * 100% / 3) calc(3 * 100% / 3);
    }
    30%,
    33.33% {
      background-position:
        calc(0 * 100% / 3) calc(2 * 100% / 3),
        calc(1 * 100% / 3) calc(2 * 100% / 3),
        calc(2 * 100% / 3) calc(2 * 100% / 3),
        calc(3 * 100% / 3) calc(2 * 100% / 3);
    }
    41.67% {
      background-position:
        calc(0 * 100% / 3) calc(1 * 100% / 3),
        calc(1 * 100% / 3) calc(2 * 100% / 3),
        calc(2 * 100% / 3) calc(2 * 100% / 3),
        calc(3 * 100% / 3) calc(2 * 100% / 3);
    }
    50% {
      background-position:
        calc(0 * 100% / 3) calc(1 * 100% / 3),
        calc(1 * 100% / 3) calc(1 * 100% / 3),
        calc(2 * 100% / 3) calc(2 * 100% / 3),
        calc(3 * 100% / 3) calc(2 * 100% / 3);
    }
    58.33% {
      background-position:
        calc(0 * 100% / 3) calc(1 * 100% / 3),
        calc(1 * 100% / 3) calc(1 * 100% / 3),
        calc(2 * 100% / 3) calc(1 * 100% / 3),
        calc(3 * 100% / 3) calc(2 * 100% / 3);
    }
    63%,
    66.67% {
      background-position:
        calc(0 * 100% / 3) calc(1 * 100% / 3),
        calc(1 * 100% / 3) calc(1 * 100% / 3),
        calc(2 * 100% / 3) calc(1 * 100% / 3),
        calc(3 * 100% / 3) calc(1 * 100% / 3);
    }
    75% {
      background-position:
        calc(0 * 100% / 3) calc(0 * 100% / 3),
        calc(1 * 100% / 3) calc(1 * 100% / 3),
        calc(2 * 100% / 3) calc(1 * 100% / 3),
        calc(3 * 100% / 3) calc(1 * 100% / 3);
    }
    83.33% {
      background-position:
        calc(0 * 100% / 3) calc(0 * 100% / 3),
        calc(1 * 100% / 3) calc(1 * 100% / 3),
        calc(2 * 100% / 3) calc(0 * 100% / 3),
        calc(3 * 100% / 3) calc(1 * 100% / 3);
    }
    91.67% {
      background-position:
        calc(0 * 100% / 3) calc(0 * 100% / 3),
        calc(1 * 100% / 3) calc(0 * 100% / 3),
        calc(2 * 100% / 3) calc(0 * 100% / 3),
        calc(3 * 100% / 3) calc(1 * 100% / 3);
    }
    100% {
      background-position:
        calc(0 * 100% / 3) calc(0 * 100% / 3),
        calc(1 * 100% / 3) calc(0 * 100% / 3),
        calc(2 * 100% / 3) calc(0 * 100% / 3),
        calc(3 * 100% / 3) calc(0 * 100% / 3);
    }
  }
`;
const LoadingFail = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  width: fit-content;
  margin: auto;
  color: #a7a7a7;
`;

export default ThemeSearch;
