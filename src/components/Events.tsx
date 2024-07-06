import React from 'react'
// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Events = () => {
  modules: [Navigation, Pagination]
  return (
    <div>
      {/* 
        direction: 'vertical',
        loop: true,
        navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      */}
    </div>
  )
}

export default Events
