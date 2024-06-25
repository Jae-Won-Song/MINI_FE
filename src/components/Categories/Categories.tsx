'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';
import { FaHotel, FaSkiing } from 'react-icons/fa';
import {
  GiHouse,
  GiBlockHouse,
  GiFamilyHouse,
  GiCoffeeCup,
} from 'react-icons/gi';
import { BsBuildingsFill } from 'react-icons/bs';
import { MdOutlineVilla } from 'react-icons/md';
import { FaPeopleRoof } from 'react-icons/fa6';
import { PiBuildingApartmentFill } from 'react-icons/pi';
import Image from 'next/image';
import styled from 'styled-components';
import CategoryBox from './CategoryBox';
import hanok from '../../../public/svgs/Hanok.svg';
import hot from '../../../public/svgs/hot.svg';

const HanokIcon = () => 
  <Image src={hanok} alt="Hanok Icon" width={26} height={26} />;
const HotIcon = () => 
  <Image src={hot} alt="hot Icon" width={26} height={26} />;

export const categories = [
  {
    label: '전체 보기',
    path: '',
    icon: HotIcon,
    descriptioin: '전체 보기 카테고리입니다.',
  },
  {
    label: '관광호텔',
    path: 'hotel',
    icon: FaHotel,
    descriptioin: '관광호텔 카테고리입니다.',
  },
  {
    label: '콘도미니엄',
    path: 'condominium',
    icon: BsBuildingsFill,
    descriptioin: '콘도미니엄 카테고리입니다.',
  },
  {
    label: '유스호스텔',
    path: 'youth-hostel',
    icon: MdOutlineVilla,
    descriptioin: '유스호스텔 카테고리입니다.',
  },
  {
    label: '펜션',
    path: 'pension',
    icon: GiBlockHouse,
    descriptioin: '펜션 카테고리입니다.',
  },
  {
    label: '모텔',
    path: 'motel',
    icon: PiBuildingApartmentFill,
    descriptioin: '모텔 카테고리입니다.',
  },
  {
    label: '민박',
    path: 'bed-and-breakfast',
    icon: GiHouse,
    descriptioin: '민박 카테고리입니다.',
  },
  {
    label: '게스트하우스',
    path: 'guest-house',
    icon: GiFamilyHouse,
    descriptioin: '게스트하우스 카테고리입니다.',
  },
  {
    label: '홈스테이',
    path: 'home-stay',
    icon: FaPeopleRoof,
    descriptioin: '홈스테이 카테고리입니다.',
  },
  {
    label: '서비스드레지던스',
    path: 'serviced-residence',
    icon: GiCoffeeCup,
    descriptioin: '서비스드레지던스 카테고리입니다.',
  },
  {
    label: '한옥',
    path: 'hanok',
    icon: HanokIcon,
    descriptioin: '한옥 카테고리입니다.',
  },
];

const Categories = () => {
  const params = useSearchParams();
  console.log(params?.get('category'));
  const category = params?.get('category');

  return (
    <CategoryWrapper>
      {categories.map((item) => (
        <CategoryBox
          key={item.label}
          label={item.label}
          path={item.path}
          icon={item.icon}
          selected={category === item.path}
        />
      ))}
    </CategoryWrapper>
  );
};

const CategoryWrapper = styled.div`
  width: 1500px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  overflow-x: auto;
  margin: auto;
`;

export default Categories;
