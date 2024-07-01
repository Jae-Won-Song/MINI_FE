import React, { useState, useEffect, useRef } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import PaginationButtons from '../PaginationButtons';

interface Accommodation {
  id: number;
  title: string;
  address: string;
  address2: string;
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
  accommodations: Accommodation[];
}

const KakaoMap: React.FC<KakaoMapProps> = ({ latitude, longitude }) => {
  const [accommodationData, setAccommodationData] = useState<Accommodation[]>(
    [],
  );
  const [mapCenter, setMapCenter] = useState({ lat: latitude, lng: longitude });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const mapRef = useRef<any>(null);

  const fetchAccommodations = async (page: number) => {
    try {
      const res = await fetch(
        `https://yusuengdo.ddns.net/open-api/accommodation?page=${page}`,
      );
      const data = await res.json();
      if (data && data.data && data.data.content.length > 0) {
        const fetchedAccommodations = data.data.content;
        setAccommodationData(fetchedAccommodations);
        setTotalPages(data.data.totalPages);

        if (fetchedAccommodations.length > 0) {
          const firstAccommodation = fetchedAccommodations[0];
          setMapCenter({
            lat: firstAccommodation.latitude,
            lng: firstAccommodation.longitude,
          });
        }
      }
    } catch (error) {
      console.error('데이터 조회 실패: ', error);
    }
  };

  useEffect(() => {
    fetchAccommodations(currentPage);
  }, [currentPage]);

  // useEffect(() => {
  //   if (mapRef.current) {
  //     mapRef.current.relayout();
  //   }
  // }, [mapCenter]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="main-wrapper">
      <div>
        <section className="accommodation">
          {accommodationData.map((accommodation) => (
            <div key={accommodation.id}>
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
            </div>
          ))}
        </section>
        <PaginationButtons
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <div className="map">
        <Map
          center={mapCenter}
          style={{ width: '100%', height: '100vh' }}
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
      </div>
    </div>
  );
};

export default KakaoMap;
