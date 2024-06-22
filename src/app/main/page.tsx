import React from 'react';
import './main.scss';
import '../../styles/base/_reset.scss';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer';
import MainBanner from '@/components/Banner/MainBanner';
import MainSearchRegion from '@/components/Banner/MainSearchRegion';
import MainSearchDate from '@/components/Banner/MainSearchDate';
import PaginationButtons from '@/components/PaginationButtons';
import SlideButtons from '@/components/SlideButtons';
import CalendarMain from '@/components/Calendar/CalendarMain';
import TravelPlaceKeywords from '@/components/TravelPlaceKeywords';

const page = () => {
  return (
    <>
      {/* <Navbar /> */}
      {/* <MainBanner /> */}
      <TravelPlaceKeywords />
      <Footer />
      <MainSearchRegion/>
      <MainSearchDate />
      {/* <PaginationButtons/> */}
      {/* <SlideButtons arrowDirection="left" size="smallCircle" active={true} />  필요한 속성 추가 */}
      {/* <SlideButtons arrowDirection="right" size="smallCircle" active={true} />  필요한 속성 추가 */}
      {/* <CalendarMain/> */}
      <div>test</div>
    </>
  );
};

export default page;
