'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import DateRegionDropdown from '@/components/DateRegionDropdown';

const SearchMap = dynamic(() => import('@/components/KakaoMap/SearchMap'), {
  ssr: false,
});

const SearchResultsPage = () => {
  const [accommodationData, setAccommodationData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleClose = () => {
    console.log('Dropdown closed');
  };

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const res = await fetch(
          'https://yusuengdo.ddns.net/open-api/accommodation',
        );
        const data = await res.json();
        if (data && data.data && data.data.content.length > 0) {
          setAccommodationData(data.data.content);
          setLoading(false);
        } else {
          setAccommodationData([]);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching accommodations:', error);
        setLoading(false);
      }
    };

    fetchAccommodations();
  }, []);

  return (
    <>
      <div className="search-wrapper">
        <div className="togo-dropdown">
          <DateRegionDropdown onClose={handleClose} />
        </div>
      </div>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <SearchMap
            latitude={0}
            longitude={0}
            accommodationInfo={accommodationData}
          />
        )}
      </div>
    </>
  );
};

export default SearchResultsPage;
