import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer';
import MainBanner from '@/components/Banner/MainBanner';
import MainSearchRegion from '@/components/Banner/MainSearchRegion';
import MainSearchDate from '@/components/Banner/MainSearchDate';
import PaginationButtons from '@/components/PaginationButtons';
import SlideButtons from '@/components/SlideButtons';
import TravelPlaceKeywords from '@/components/TravelPlaceKeywords';

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <MainBanner />
      <TravelPlaceKeywords />
      <Footer />
      <MainSearchRegion />
      <MainSearchDate />
      <PaginationButtons />
      <SlideButtons arrowDirection="left" size="smallCircle" active={true} />
      <SlideButtons arrowDirection="right" size="smallCircle" active={true} />
    </div>
  );
}

export default Home;
