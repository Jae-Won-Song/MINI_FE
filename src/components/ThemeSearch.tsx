'use client'

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AccomodationCard from './AccomodationCard';
import mockData from '../app/lib/mockdata.json';
import PaginationButtons from './PaginationButtons';
import Categories from './Categories/Categories';
import EmptyState from './EmptyState';
import Container from './Container';

interface Hotel {
  name: string;
  address: string;
  rooms: number;
  contract: string;
  latitude: number;
  longtitude: number;
  photo: string;
}

const ThemeSearch: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [page, setPage] = useState(1);
  const PRODUCTS_PER_PAGE = 15;

  useEffect(() => {
    // 실제 데이터 로드
    setHotels(mockData);
  }, []);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
  const currentPageData = hotels.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  return (
    <Container>
      <Categories />
      {hotels.length === 0 ? (
        <EmptyState showReset />
      ) : (
        <>
          <GridContainer>
            {currentPageData.map((hotel) => (
              <AccomodationCard key={hotel.name} data={hotel} />
            ))}
          </GridContainer>
          <PaginationButtons
            page={page}
            totalItems={hotels.length}
            perPage={PRODUCTS_PER_PAGE}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </Container>
  );
};

const GridContainer = styled.div`  
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  padding-top: 50px;

  @media (min-width: 1080px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1920px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

export default ThemeSearch;
