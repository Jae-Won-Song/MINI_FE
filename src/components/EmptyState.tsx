'use client';

import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import styled from 'styled-components';
import Image from 'next/image';
import SlideButtons from '@/components/SlideButtons';
import buckchon from '../../public/images/Events/bukchon.jpg';
import jusangjoint from '../../public/images/Events/jusang-joint.jpg';
import koreabamboo from '../../public/images/Events/korea-bamboo.jpg';
import pohang from '../../public/images/Events/pohang.jpg';
import salad from '../../public/images/Events/salad.jpg';
import suwon from '../../public/images/Events/suwon.jpg';
import temple from '../../public/images/Events/temple.jpg';
import temple2 from '../../public/images/Events/temple2.jpg';
import yangdong from '../../public/images/Events/yangdong.jpg';

const EventImage = [
  {
    label: '북촌 주변 숙소 추천',
    overview: '',
    src: buckchon,
    alt: 'Buckhon',
  },
  {
    label: '주상절리 주변 숙소 추천',
    src: jusangjoint,
    alt: 'JusangJoint',
  },
  {
    label: '대나무숲이 보이는 풍경',
    src: koreabamboo,
    alt: 'Koreabamboo',
  },
  {
    label: '포항 호미곶 투어 패키지',
    src: pohang,
    alt: 'Pohang',
  },
  {
    label: '퓨전 한식을 만나보세요',
    src: salad,
    alt: 'Salad',
  },
  {
    label: '수원 역사 · 문화 투어',
    src: suwon,
    alt: 'Suwon',
  },
  {
    label: '조계종 제공 템플스테이 패키지',
    src: temple,
    alt: 'TempleStay',
  },
  {
    label: '사찰음식 패키지',
    src: temple2,
    alt: 'TempleFood',
  },
  {
    label: '양동마을 전통문화 체험',
    src: yangdong,
    alt: 'Yangdong',
  },
];

const Events = () => {
  const swiperContainerRef = useRef(null);

  useEffect(() => {
    if (swiperContainerRef.current) {
      const swiperInstance = new Swiper(swiperContainerRef.current, {
        modules: [Navigation, Pagination, Autoplay],
        spaceBetween: 20,
        slidesPerView: 6,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: { clickable: true },
      });
    }
  }, []);

  return (
    <SwiperWrapper>
      <div className="swiper-button-prev">
        <SlideButtons arrowDirection="left" size="smallCircle" />
      </div>
      <SwiperContainer>
        <div className="swiper-container" ref={swiperContainerRef}>
          <div className="swiper-wrapper">
            {EventImage.map((image, index) => (
              <div
                className="swiper-slide"
                key={index}
                style={{ position: 'relative' }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  layout="fixed"
                  width={300}
                  height={300}
                />
                <EventLabels>{image.label}</EventLabels>
              </div>
            ))}
          </div>
        </div>
      </SwiperContainer>
      <div className="swiper-button-next">
        <SlideButtons arrowDirection="right" size="smallCircle" />
      </div>
    </SwiperWrapper>
  );
};

const SwiperWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  position: relative;
`;

const SwiperContainer = styled.div`
  overflow: hidden;
  display: flex;
  margin: 0 10px;

  .swiper-slide {
    width: 300px !important;
    height: 300px !important;
    position: relative;
  }
  .swiper-button-next,
  .swiper-button-prev {
    color: #000;
  }
`;

const EventLabels = styled.div`
  position: absolute;
  width: 250px;
  display: flex;
  justify-content: center;
  top: 45%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px 10px;
  font-size: 1.2rem;
  font-weight: 700;
  word-break: keep-all;
  text-align: center;
`;

export default Events;
