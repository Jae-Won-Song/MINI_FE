'use client'

import React, { useState } from 'react';
import styled from 'styled-components';
import AccomodationCard from './AccomodationCard';
import PaginationButtons from './PaginationButtons copy';
import Categories from './Categories/Categories';
import EmptyState from './EmptyState';
import useSWR from 'swr';

interface Accomodation {
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
    content: Accomodation[];
  };
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

const ThemeSearch: React.FC = () => {
  const [page, setPage] = useState(1);

  const { data, error } = useSWR<APIResponse>(`https://yusuengdo.ddns.net/open-api/accommodation?page=${page}`, fetcher);
  console.log('Accomodation Data', data)

// 가져올 수 있는 데이터의 페이지 수 계산해서 페이지네이션에 반영하는 방법 알아보기
  // const totalPages = Math.ceil(data.totalElements / data.size);
  // console.log('totalPages', totalPages)
  // 모든 데이터를 가져와서 숙박업소 종류별로 볼 수 있게 해야 함.

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  // data.data가 undefined일 때를 대비해 기본값 설정. 이때는 '데이터 불러오기 실패' 문구만 출력되게 해야 함.
  // 필터링했을 경우에만, 필터에 해당되는 데이터가 없으면 버튼이 EmptyState가 출력되게 함.
  // 기본값은 전체 보기. 새로고침을 하면 기본값인 전체보기 필터링이 적용된다.
  const { content: accomodations = [], totalElements = 0 } = data.data || {};

  return (
    <ThemeWrapper>
      <Categories />
      {accomodations.length === 0 ? (
        <EmptyState showReset />
      ) : (
        <>
          <GridWrapper>
            {accomodations.map((accomodation) => (
              <AccomodationCard key={accomodation.id} data={accomodation} />
            ))}
          </GridWrapper>
          <PaginationButtons
            page={page}
            totalItems={totalElements}
            perPage={data.data.size}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </ThemeWrapper>
  );
};


const ThemeWrapper = styled.div`
  margin: 0 auto;
`

const GridWrapper = styled.div`  
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding-top: 30px;

  @media (min-width: 1080px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export default ThemeSearch;
