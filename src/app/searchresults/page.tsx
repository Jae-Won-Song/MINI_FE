'use client';

import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import SearchMap from '@/components/KakaoMap/SearchMap';
import Footer from '@/components/Footer';
import DateRegionDropdown from '@/components/DateRegionDropdown';

const SearchResultsPage = () => {
  const handleClose = () => {
    console.log('Dropdown closed');
  };

  return (
    <>
      <Navbar />
      <div className="search-wrapper">
        <li className="togo-dropdown">
          <DateRegionDropdown onClose={handleClose} />
        </li>
      </div>
      <div>
        <SearchMap latitude={0} longitude={0} />
      </div>
      <Footer />
    </>
  );
};

export default SearchResultsPage;
