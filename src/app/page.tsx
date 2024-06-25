import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer';
import MainBanner from '@/components/Banner/MainBanner';

import SlideButtons from '@/components/SlideButtons';
import TravelPlaceKeywords from '@/components/TravelPlaceKeywords';
import ThemeSearch from '@/components/ThemeSearch';

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <MainBanner />
      <ThemeSearch />
      <TravelPlaceKeywords />
      <Footer />
      <SlideButtons arrowDirection="left" size="smallCircle" active={true} />
      <SlideButtons arrowDirection="right" size="smallCircle" active={true} />
    </div>
  );
}

export default Home;
