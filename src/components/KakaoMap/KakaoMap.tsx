'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import PaginationButtons from '../PaginationButtons';

interface Accommodation {
  id: number;
  title: string;
  address: string;
  address2: string;
  area: string;
  category: string;
  image: string;
  thumbnail: string;
  latitude: number;
  longitude: number;
  likeCount: number;
  rating: number;
  price: number;
}

interface KakaoMapProps {
  latitude: number;
  longitude: number;
}

const KakaoMap: React.FC<KakaoMapProps> = ({ latitude, longitude }) => {
  const searchParams = useSearchParams();
  const [accommodationData, setAccommodationData] = useState<Accommodation[]>(
    [],
  );
  const [mapCenter, setMapCenter] = useState({ lat: latitude, lng: longitude });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const mapRef = useRef<any>(null);

  const ITEMS_PER_PAGE = 9;

  const fetchAccommodations = async (page: number, area?: string) => {
    setLoading(true);
    try {
      let url = `https://yusuengdo.ddns.net/open-api/accommodation?page=${page}`;
      if (area) {
        url += `&area=${encodeURIComponent(area)}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      if (data && data.data && data.data.content.length > 0) {
        const fetchedAccommodations = data.data.content;
        setAccommodationData(fetchedAccommodations.slice(0, ITEMS_PER_PAGE));
        setTotalPages(Math.ceil(data.data.totalElements / ITEMS_PER_PAGE));
      } else {
        setAccommodationData([]);
        setTotalPages(1);
        setMapCenter({ lat: latitude, lng: longitude });
      }
    } catch (error) {
      console.error('데이터 조회 실패: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setAccommodationData([]);
    const region = searchParams.get('region');
    if (region) {
      setSelectedArea(region);
    }
    fetchAccommodations(currentPage, region as string);
  }, [currentPage, searchParams]);

  useEffect(() => {
    if (accommodationData.length > 0) {
      const lastAccommodation = accommodationData[accommodationData.length - 1];
      setMapCenter({
        lat: lastAccommodation.latitude,
        lng: lastAccommodation.longitude,
      });
    }
  }, [accommodationData]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <KakaoMapContainer>
      <MainWrapper>
        <AccommodationSection>
          {loading && <p>로딩 중...</p>}
          {!loading && accommodationData.length === 0 && <p>관련 정보 없음</p>}
          {!loading && accommodationData.length > 0 && (
            <AccommodationGrid>
              {accommodationData.map((accommodation) => (
                <AccommodationCard key={accommodation.id}>
                  <img
                    src={accommodation.thumbnail}
                    alt={`숙소 ${accommodation.title}`}
                  />
                  <div className="accommodation-title">
                    <h3>{accommodation.title}</h3>
                    <p>★ : {accommodation.rating}</p>
                  </div>
                  <p>{accommodation.address}</p>
                  <p>₩{accommodation.price}/박</p>
                </AccommodationCard>
              ))}
            </AccommodationGrid>
          )}
          <PaginationButtons
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </AccommodationSection>
        <MapSection>
          {loading && <p>지도 로딩 중...</p>}
          {!loading && (
            <Map
              center={mapCenter}
              style={{ width: '100%', height: '100%' }}
              level={5}
              ref={mapRef}
            >
              {accommodationData.map((accommodation) => (
                <MapMarker
                  key={accommodation.id}
                  position={{
                    lat: accommodation.latitude,
                    lng: accommodation.longitude,
                  }}
                >
                  <div>{accommodation.title}</div>
                </MapMarker>
              ))}
            </Map>
          )}
        </MapSection>
      </MainWrapper>
    </KakaoMapContainer>
  );
};

export default KakaoMap;

const KakaoMapContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex: 1;
`;

const AccommodationSection = styled.section`
  width: 40vw;
  overflow-y: auto;
  padding: 20px;
`;

const MapSection = styled.section`
  width: 40vw;
  height: 80vh;
  position: relative;
`;

const AccommodationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const AccommodationCard = styled.div`
  padding: 10px;
  border-radius: 16px;
  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
  }
  .accommodation-title {
    margin-top: 10px;
    h3 {
      font-size: 18px;
      margin-bottom: 5px;
    }
    p {
      font-size: 14px;
      color: #888;
      text-align: left;
    }
  }
`;
