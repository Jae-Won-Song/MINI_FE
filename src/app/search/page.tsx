'use client';

import dynamic from 'next/dynamic';
import './search.scss';
import DateRegionDropdown from '../../components/DateRegionDropdown';

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
          <DateRegionDropdown onClose={handleClose} />
        </li>
      </div>
      <div>
        <KakaoMap />
      </div>
    </>
  );
};

export default Page;