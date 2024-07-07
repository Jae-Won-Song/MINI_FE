/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
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

interface SearchMapProps {
  latitude: number;
  longitude: number;
  accommodationInfo: Accommodation[];
}

const SearchMap: React.FC<SearchMapProps> = ({
  latitude,
  longitude,
  accommodationInfo,
}) => {
  const searchParams = useSearchParams();
  const [accommodationData, setAccommodationData] = useState<Accommodation[]>(
    [],
  );
  const [mapCenter, setMapCenter] = useState({ lat: latitude, lng: longitude });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageGroup, setCurrentPageGroup] = useState(1);

  const mapRef = useRef<any>(null);

  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
    const fetchAccommodations = async () => {
      setLoading(true);
      try {
        const region = searchParams?.get('region');
        const startDate = searchParams?.get('startDate');
        const endDate = searchParams?.get('endDate');
        const headcount = searchParams?.get('headcount');

        if (!region || !startDate || !endDate || !headcount) {
          console.log('Missing query parameters');
          setLoading(false);
          return;
        }

        const url = `https://yusuengdo.ddns.net/open-api/accommodation/condition?area=${encodeURIComponent(region)}&startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}&headcount=${encodeURIComponent(headcount)}`;

        const res = await fetch(url);
        const data = await res.json();

        if (data && data.data && data.data.content.length > 0) {
          const fetchedAccommodations = data.data.content;
          setAccommodationData(fetchedAccommodations.slice(0, ITEMS_PER_PAGE));
          const lastAccommodation =
            fetchedAccommodations[fetchedAccommodations.length - 1];
          setMapCenter({
            lat: lastAccommodation.latitude,
            lng: lastAccommodation.longitude,
          });
        } else {
          setAccommodationData([]);
          setMapCenter({ lat: latitude, lng: longitude });
        }
      } catch (error) {
        console.error('데이터 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodations();
  }, [searchParams, latitude, longitude]);

  if (!searchParams) {
    return <div>Loading...</div>;
  }

  return (
    <SearchMapContainer>
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
            totalPages={Math.ceil(accommodationInfo.length / ITEMS_PER_PAGE)}
            onPageChange={(page: number) => setCurrentPage(page)}
            currentPageGroup={currentPageGroup}
            setCurrentPageGroup={setCurrentPageGroup}
          />
        </AccommodationSection>
        <MapSection>
          {loading && <p>지도 로딩 중...</p>}
          {!loading && accommodationData.length > 0 && (
            <Map
              center={mapCenter}
              style={{ width: '100%', height: '100%' }}
              level={10}
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
    </SearchMapContainer>
  );
};

export default SearchMap;

const SearchMapContainer = styled.div`
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
  display: flex;
  width: 40vw;
  padding: 20px;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: center;
`;

const MapSection = styled.section`
  width: 40vw;
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
