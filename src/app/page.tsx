import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer';
import MainBanner from '@/components/Banner/MainBanner';

import SlideButtons from '@/components/SlideButtons';
import TravelPlaceKeywords from '@/components/TravelPlaceKeywords';
import ThemeSearch from '@/components/ThemeSearch';
import Events from '@/components/Events';

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <MainBanner />
      <Events />
      <hr style={{ marginTop: '100px', marginBottom: '100px', width: '1500px'}}/>
      <ThemeSearch />
      <hr style={{ marginTop: '100px', marginBottom: '100px', width: '1500px'}}/>
      <TravelPlaceKeywords />
      <Footer />
    </div>
  );
}

export default Home;
