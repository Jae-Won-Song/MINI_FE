import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer';
import MainBanner from '@/components/Banner/MainBanner';
import UnderMainBanner from '@/components/UnderMainBanner';

import SlideButtons from '@/components/SlideButtons';
import TravelPlaceKeywords from '@/components/TravelPlaceKeywords';
import ThemeSearch from '@/components/ThemeSearch';

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <MainBanner />
      <UnderMainBanner />
      <Footer />
    </>
  );
};
export default Home;
