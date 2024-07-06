'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import DateRegionDropdown from '../../components/DateRegionDropdown';
import './search.scss';

const Page = () => {
  const KakaoMap = dynamic(() => import('../../components/KakaoMap/KakaoMap'), {
    ssr: false,
  });

  const handleClose = () => {
    console.log('Dropdown closed');
  };

  return (
    <>
      <div className="search-wrapper">
        <li className="togo-dropdown">
          <DateRegionDropdown onClose={() => handleClose()} />
        </li>
      </div>
      <div>
        <KakaoMap latitude={0} longitude={0} />
      </div>
    </>
  );
};

export default Page;
