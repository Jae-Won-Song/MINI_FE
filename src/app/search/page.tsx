'use client';

import dynamic from 'next/dynamic';
import './search.scss';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer';
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
      <Navbar />
      <div className="search-wrapper">
        <li className="togo-dropdown">
          <DateRegionDropdown onClose={handleClose} />
        </li>
      </div>
      <div>
        <KakaoMap />
      </div>
      <Footer />
    </>
  );
};

export default Page;
